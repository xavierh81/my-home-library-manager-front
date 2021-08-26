// Imports
import React, { useEffect } from 'react';
import { t } from "@lingui/macro"
import { ApolloError, useApolloClient } from '@apollo/client';

// Apollo / GraphQL
import {getUser} from 'graphql/api'

//
// Core
//

// Define main state type
type HomeState = {
    user: any
}

// Main element
function Home() {
    // Define state variables
    const [state, setState] = React.useState<HomeState>({ user: null });

    // Load hooks
    const apolloClient = useApolloClient();

    // Run this at the page mount
    useEffect(() => {
        // Retrieve user
        getUser(apolloClient).then((user) => {
            setState(prevState => ({ ...prevState, user}))
            console.log("User retrieved");
            console.log(user);
        })
        .catch((error) => {
            console.log("Error while retrieving user");
            console.log(error)
        })
    }, [apolloClient])

    // Render
    return (
        <div className="notConnectedContainer">
            <div className="bg"></div>
            <div className="formContainer">
                <div className="formContent">
                    <span className="formTitle">Logged into app</span>
                    {state.user != null &&
                        <div>
                            <span>Hello {state.user.mail}</span>
                            <br />
                            <span>{state.user.firstName} {state.user.lastName}</span>
                            <br /><br />
                        </div>
                    }

                    <button onClick={() => {localStorage.setItem('mhlm_accessToken', 'corrupted')}}>Corrupt access token</button>
                    <br/><br/>
                    <button onClick={() => {localStorage.removeItem('mhlm_accessToken')}}>Remove access token</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
