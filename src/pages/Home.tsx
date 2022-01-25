// Imports
import React, { useEffect } from 'react';

// Apollo
import { useApolloClient } from '@apollo/client';
import { getUser } from 'graphql/api';

// Components
import MainLayout from 'components/templates/MainLayout';

//
// Core
//

// Define main state type
type HomeState = {
    user: any
}

// Main element
function Home() {
    // Load hooks
    const apolloClient = useApolloClient();

    // Define state variables
    const [state, setState] = React.useState<HomeState>({ user: null });

    // Run this at the page mount
    useEffect(() => {
        // Retrieve user
        getUser(apolloClient).then((user) => {
            setState(prevState => ({ ...prevState, user}))
        })
        .catch((error) => {

        })
    }, [apolloClient])

    // Render
    return (
        <MainLayout>
            <h1>Welcome {state.user != null && <span>{state.user.firstName}</span>}</h1>
        </MainLayout>
    )
}

export default Home;
