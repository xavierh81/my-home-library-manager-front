// Imports
import gql from "graphql-tag";

// Refresh authentication token if expired
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

// Login with existing account
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
            accessToken
        }
    }
`;

// Create a new user account
export const MUTATION_REGISTER_KEY = 'register'
export const MUTATION_REGISTER = gql`
    mutation register(
        $firstName: String!,
        $lastName: String!,
        $mail: String!,
        $password: String!
    ) 
    {
        register(
            firstName: $firstName,
            lastName: $lastName,
            mail: $mail,
            password: $password
        ) 
        {
            accessToken
        }
    }
`;