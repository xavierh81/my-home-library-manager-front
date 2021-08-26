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