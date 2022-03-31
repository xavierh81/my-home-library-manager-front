// Imports
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { t, Plural } from "@lingui/macro"
import { useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { Col, Input, Row, notification } from 'antd';

// Apollo / GraphQL
import {getUser,searchMedias,saveMedia} from 'graphql/api'

// Components
import MainLayout from 'components/templates/MainLayout';
import SettingsLayout from 'components/templates/SettingsLayout';
import { MediaSearchResultElement } from 'components/MediaSearchResultElement'
import { FullScreenLoader } from 'components/FullscreenLoader';

// Constants
import { media_types, Routes } from 'config/constants'

// Types
import { MediaSearchResult } from 'ts/interfaces/MediaSearchResult';


//
// Core
//

// Define main state type
type AddMediaState = {
    user: any,

    searchText: any,
    searchProcessing: boolean,
    searchResults: MediaSearchResult[] | null,
    searchError: string | null,

    addProcessing: boolean
}

// Main element
function AddMedia() {
    // Load hooks
    const apolloClient = useApolloClient();
    const history = useHistory();

    // Define state variables
    const [state, setState] = React.useState<AddMediaState>({ user: null, searchText: "", searchProcessing: false, searchResults: null, searchError: null, addProcessing: false });

    // Run this at the page mount
    useEffect(() => {
        // Retrieve user
        getUser(apolloClient).then((user) => {
            setState(prevState => ({ ...prevState, user}))
        })
        .catch((error) => {

        })
    }, [apolloClient])

    //
    // UI Helpers
    //

    const isMediaInLibrary = (media: MediaSearchResult) => {
        if(
            state.user != null 
            && state.user.medias.length > 0
            && state.user.medias.find((m: { searchSource: string; searchSourceMediaId: string; }) => m.searchSource === media.searchSource && m.searchSourceMediaId === media.searchSourceMediaId) != null
        ) 
            return true;

        return false
    }

    //
    // UI Actions
    //

    // Callback when the user click on search icon / push enter key
    // The search is then fired and an API call is made to retrieve results
    const onSearch = (value: string) => {
        setState(prevState => ({ ...prevState, searchResults: null, searchProcessing: true }))

        // Call the updateUser Mutation
        searchMedias(apolloClient, value, media_types.MOVIE).then((results) => {

            let searchResults : MediaSearchResult[] = []

            // Browse results
            results.forEach((searchResult: any) => {
                searchResults.push(new MediaSearchResult(searchResult))
            })

            setState(prevState => ({ ...prevState, searchResults, searchProcessing: false}))
        })
        .catch((error) => {
            setState(prevState => ({ ...prevState, searchProcessing: false, searchError: error.message }))
        })
    }

    // Action when the user clicks on a search result 
    const onAddMedia = (media: MediaSearchResult) => {
        setState(prevState => ({ ...prevState, addProcessing: true }))

        // Call the updateUser Mutation
        saveMedia(apolloClient, media.title, media_types.MOVIE, media.searchSource, media.searchSourceMediaId, media.originalTitle, media.summary, media.imageUrl, media.releaseDate, media.rating).then((result) => {
            // Redirect to library list
            history.push(Routes.HOME, {mediaAdded: true, mediaTitle: media.title})
        })
        .catch((error) => {
            setState(prevState => ({ ...prevState, addProcessing: false }))

            notification.error({
                message: t`global_error_notification_title`,
                description: error.message,
            });
        })
    }

    //
    // Render
    //
    return (
        <MainLayout>
            <SettingsLayout title={t`add_media_view_title`} icon={<FontAwesomeIcon icon={faPlusSquare} />}>
                <Row>
                    <Col xs={24} sm={18} md={14}>
                        <Input.Search size="large" placeholder={t`add_media_view_search_placeholder`} onSearch={onSearch} enterButton loading={state.searchProcessing} />

                        {state.searchResults != null && 
                            <span className="searchResultsCount">
                                <Plural id="add_media_view_search_results_summary" value={state.searchResults.length} />
                            </span>
                        }

                        {state.searchResults != null && state.searchResults.length > 0 && 
                            <div className="mediasSearchResults">
                                {state.searchResults.map((media) => {
                                    return (
                                        <MediaSearchResultElement key={`media_${media.searchSourceMediaId}`} media={media} onAdd={() => onAddMedia(media)} alreadyInLibrary={isMediaInLibrary(media)} />
                                    )
                                })}
                            </div>
                        }
                    </Col>
                </Row>

                {state.addProcessing && 
                    <FullScreenLoader />
                }
            </SettingsLayout>
        </MainLayout>
    )
}

export default AddMedia;
