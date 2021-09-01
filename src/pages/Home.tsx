// Imports
import React, { useEffect } from 'react';
import { t } from "@lingui/macro"
import { ApolloError, useApolloClient } from '@apollo/client';

// Apollo / GraphQL
import {getUser} from 'graphql/api'

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
    // Define state variables
    const [state, setState] = React.useState<HomeState>({ user: null });

    // Render
    return (
        <MainLayout>
            Test home layout
            {state.user != null && <span>{state.user.name}</span>}
        </MainLayout>
    )
}

export default Home;
