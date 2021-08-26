// Apollo
import { ApolloClient, NormalizedCacheObject, InMemoryCache, Observable } from '@apollo/client'
import { ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

// Libraries
import fetch from 'isomorphic-unfetch'

// Helpers
import { isServerSideScope } from 'helpers/global'
import { signOut, getAccessToken, setAccessToken } from 'helpers/auth'

// GraphQL
import {  
    MUTATION_LOGIN_KEY,    
    MUTATION_REFRESH_ACCESS_TOKEN,
    MUTATION_REFRESH_ACCESS_TOKEN_KEY
} 
from 'graphql/mutations'

import {USER_NOT_ALLOWED_ERROR_CODE} from 'graphql/errors/codes'

// Configuration
var env       = process.env.SERVER_ENV || "local";
const config    = require('config/config').default[env];

//
// Core part
//

// Declare apolloClient object
let apolloClient: ApolloClient<NormalizedCacheObject>;

// Polyfill fetch() on the server (used by apollo-client)
if (isServerSideScope()) {
    global.fetch = fetch
}

// Function that configure the whole ApolloClient
function create(initialState: any) {

    // Custom handling of errors
    // Note: In this part, we will add the automatic refresh of accessToken
    const errorLink = onError(({ graphQLErrors, operation, forward }) => {

        // Log graphQLErrors if enabled
        if(config.logging.graphQLErrors) 
            console.log(graphQLErrors);

        // Detect if there is a login / user not allowed error for this request
        let loginError = false

        if(graphQLErrors != null)
        { 
            for (var i = 0; i < graphQLErrors.length; i++) {
                let error = graphQLErrors[i]
                // If the error code is set to USER_NOT_ALLOWED_ERROR_CODE and if it's not a login query, then we switch loginError to true
                if( 
                    error.extensions !== undefined && error.extensions.code === USER_NOT_ALLOWED_ERROR_CODE 
                    && error.path !== undefined && !error.path.includes(MUTATION_LOGIN_KEY)
                ) 
                {
                    loginError = true
                    break
                }
            }
        }

        if(loginError) 
        {
            // If we arrive here, try to refresh the access token
            return new Observable(observer => {

                client.mutate({
                    mutation: MUTATION_REFRESH_ACCESS_TOKEN
                }).then(({ data }) => {
                    let accessToken = data[MUTATION_REFRESH_ACCESS_TOKEN_KEY].accessToken
                    setAccessToken(accessToken)

                    const observable = forward(operation)
                
                    observable.subscribe({
                        next: observer.next.bind(observer),
                        error: error => {
                            observer.next({
                                data: {
                                    error
                                }
                            })
                        },
                        complete: observer.complete.bind(observer)
                    })
                }).catch(e => {
                    // If the refresh of the access token fails, then we force a signOut
                    signOut().then(() => {
                        // Redirect to home if possible
                        if(window !== undefined) {
                            window.location.href = "/";
                        }
                    })
                })
            })
        }
    })

    const cloneLink = new ApolloLink((operation, forward) => {
        return forward(operation)
    });

    const uploadLink = createUploadLink({
        uri: config.graphqlApiEndpoint, // Server URL (must be absolute)
        credentials: 'include' // Additional fetch() options like `credentials` or `headers`
    })

    const authorizationLink = setContext((request, previousContext) => {
        let token = getAccessToken()
        if(token != null)
        {
            return {
                headers: {Authorization: `Bearer ${token}`}
            }
        }

        return {}
    });

    const link = ApolloLink.from([errorLink, authorizationLink, cloneLink, uploadLink])

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    let client = new ApolloClient({
        connectToDevTools: false,
        ssrMode: isServerSideScope(), // Disables forceFetch on the server (so queries are only run once)
        link: link,
        cache: new InMemoryCache().restore(initialState || {})
    })

    return client
}

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServerSideScope()) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
