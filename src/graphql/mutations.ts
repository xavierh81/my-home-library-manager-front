// Imports
import gql from "graphql-tag";

export const MUTATION_REFRESH_ACCESS_TOKEN_KEY = 'refreshAccessToken'
export const MUTATION_REFRESH_ACCESS_TOKEN = gql`
    mutation refreshAccessToken(
    $refreshToken: String) {
        refreshAccessToken(
        refreshToken: $refreshToken) {
            accessToken
        }
    }
`;

export const MUTATION_LOGIN_KEY = 'login'
export const MUTATION_LOGIN = gql`
    mutation login(
        $mail: String!,
        $password: String!
    ) 
    {
        login(
            mail: $mail,
            password: $password
        ) 
        {
            id,
            mail,
            refreshToken,
            accessToken
        }
    }
`;