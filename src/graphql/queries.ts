// Imports
import gql from "graphql-tag";
import fragments from "./fragments";

// Retrieve user profile
export const QUERY_GET_USER_KEY = 'user'
export const QUERY_GET_USER = gql`
    query user {
        user {
            ...User
        }
    }
    ${fragments.user}
`;

// Search media
export const QUERY_SEARCH_MEDIAS_KEY = 'searchMedias'
export const QUERY_SEARCH_MEDIAS = gql`
    query searchMedias(
        $text: String!,
        $mediaType: MediaType!
    ) {
        searchMedias(text: $text, mediaType: $mediaType) {
            ...SearchMediaResult
        }
    }
    ${fragments.searchMediaResult}
`;