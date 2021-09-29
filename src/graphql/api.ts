import { ApolloClient, ApolloError, DocumentNode } from '@apollo/client'

import {
    MUTATION_LOGIN, MUTATION_LOGIN_KEY,
    MUTATION_REGISTER, MUTATION_REGISTER_KEY,
    MUTATION_UPDATE_USER, MUTATION_UPDATE_USER_KEY
} from './mutations'

import {
    QUERY_GET_USER, QUERY_GET_USER_KEY, 
    QUERY_SEARCH_MEDIAS, QUERY_SEARCH_MEDIAS_KEY
} from './queries'

// Constants
import { media_types } from 'config/constants'

// Helpers
import { getEnumKeyByValue } from 'helpers/string'

//
// Queries
//

// Declare a global function that will be used to execute a query globally
function executeQuery(client: ApolloClient<any>, query: DocumentNode, mutationKey: string, variables: any, returnNullResult = false) : Promise<any> {
    return new Promise((resolve,reject) => {
        try {
            client.query({
                query,
                variables,
                pollInterval: 0,
                fetchPolicy: "network-only"
            }).then((result: any) => {
                if(result == null || result.data == null || (returnNullResult === false && result.data[mutationKey] == null)) {
                    throw new Error("Unknown error")
                }

                let r = result.data[mutationKey]

                resolve(r)

            }).catch((e: ApolloError) => {
                reject(e)
            })

        } catch(e) {
            reject([e])
        }
    })
}

export function getUser(client: ApolloClient<any>) : Promise<any> {
    let variables = { }
    return executeQuery(client, QUERY_GET_USER, QUERY_GET_USER_KEY, variables)
}

export function searchMedias(client: ApolloClient<any>, searchText: string, mediaType: number) : Promise<any> {
    let variables = { 
        text: searchText,
        mediaType: getEnumKeyByValue(media_types, mediaType)
    }
    return executeQuery(client, QUERY_SEARCH_MEDIAS, QUERY_SEARCH_MEDIAS_KEY, variables)
}


//
// Mutations
//

// Declare a global function that will be used to execute mutation globally
function executeMutation(client: ApolloClient<any>, mutation: DocumentNode, mutationKey: string, variables: any, returnNullResult = false) : Promise<any> {
    return new Promise((resolve,reject) => {
        try {
            client.mutate({
                mutation,
                variables
            }).then((result: any) => {
                if(result == null || result.data == null || (returnNullResult === false && result.data[mutationKey] == null)) {
                    throw new Error("Unknown error")
                }

                let r = result.data[mutationKey]
                resolve(r)

            }).catch((e: ApolloError) => {
                reject(e)
            })

        } catch(e) {
            reject([e])
        }
    })
}

export function loginMutation(client: ApolloClient<any>, mail: string, password: string) : Promise<any> {
    let variables = {
        mail, 
        password
    }
    return executeMutation(client, MUTATION_LOGIN, MUTATION_LOGIN_KEY, variables)
}

export function registerMutation(client: ApolloClient<any>, firstName: string, lastName: string, mail: string, password: string) : Promise<any> {
    let variables = {
        firstName,
        lastName,
        mail, 
        password
    }
    return executeMutation(client, MUTATION_REGISTER, MUTATION_REGISTER_KEY, variables)
}

export function updateUser(client: ApolloClient<any>, firstName: string, lastName: string, mail: string) : Promise<any> {
    let variables = {
        firstName,
        lastName,
        mail,
    }
    return executeMutation(client, MUTATION_UPDATE_USER, MUTATION_UPDATE_USER_KEY, variables)
}