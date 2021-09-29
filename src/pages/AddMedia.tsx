// Imports
import React from 'react';
import { t, Plural } from "@lingui/macro"
import { useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// Apollo / GraphQL
import {searchMedias} from 'graphql/api'

// Components
import MainLayout from 'components/templates/MainLayout';
import SettingsLayout from 'components/templates/SettingsLayout';
import { MediaSearchResultElement } from 'components/MediaSearchResultElement'
import { Col, Input, Row } from 'antd';

// Constants
import { media_types } from 'config/constants'

// Types
import { MediaSearchResult } from 'ts/interfaces/MediaSearchResult';

//
// Core
//

// Define main state type
type SettingsState = {
    searchText: any,
    searchProcessing: boolean,
    searchResults: MediaSearchResult[] | null,
    searchError: string | null
}

// Main element
function AddMedia() {
    // Load hooks
    const apolloClient = useApolloClient();

    // Define state variables
    const [state, setState] = React.useState<SettingsState>({ searchText: "", searchProcessing: false, searchResults: null, searchError: null });

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
    const onClickSearchResult = (media: MediaSearchResult) => {
        console.log("clicked on search result");
        console.log(media)
    }

    //
    // Render
    //
    return (
        <MainLayout>
            <SettingsLayout title={t`add_media_view_title`} icon={<FontAwesomeIcon icon={faPlusSquare} />}>
                <Row>
                    <Col xs={24} sm={18} md={12}>
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
                                        <MediaSearchResultElement media={media} onClick={() => onClickSearchResult(media)} />
                                    )
                                })}
                            </div>
                        }
                    </Col>
                </Row>
            </SettingsLayout>
            
        </MainLayout>
    )
}

export default AddMedia;
