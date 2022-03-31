// Imports
import React, { useEffect } from 'react';
import { Location } from "history";
import { useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import { t } from "@lingui/macro"
import { Trans } from "@lingui/react"

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
    user: any,

    showMediaAddedMessage: boolean,
    mediaAddedTitle?: string
}

// Define location state
type LocationState = {
    mediaAdded?: boolean,
    mediaTitle?: string
}

// Main element
function Home() {
    // Load hooks
    const apolloClient = useApolloClient();
    const location = useLocation<Location>();

    // Define state variables
    const [state, setState] = React.useState<HomeState>({ user: null, showMediaAddedMessage: false });

    // Run this at the page mount
    useEffect(() => {
        // Retrieve user
        getUser(apolloClient).then((user) => {
            setState(prevState => ({ ...prevState, user}))
        })
        .catch((error) => {

        })

        console.log(`Location detected`);
        console.log(location);
        if((location.state as LocationState)?.mediaAdded === true) {
            setState(prevState => ({ ...prevState, showMediaAddedMessage: true, mediaAddedTitle: (location.state as LocationState)?.mediaTitle}))
        }

    }, [apolloClient, location])

    // Render
    return (
        <MainLayout>
            {state.showMediaAddedMessage && <Alert message={<span  dangerouslySetInnerHTML={{__html: t({id: 'my_libraries_view_media_added_message', values: {mediaName: state.mediaAddedTitle}})}}></span>} type="success" /> }
            <h1>Welcome {state.user != null && <span>{state.user.firstName}</span>}</h1>
        </MainLayout>
    )
}

export default Home;
