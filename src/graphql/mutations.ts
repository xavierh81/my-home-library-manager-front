// Imports
import gql from "graphql-tag";
import fragments from "./fragments";

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

// Update user account
export const MUTATION_UPDATE_USER_KEY = 'updateUser'
export const MUTATION_UPDATE_USER = gql`
    mutation updateUser(
        $firstName: String!,
        $lastName: String!,
        $mail: String!
    ) 
    {
        updateUser(
            firstName: $firstName,
            lastName: $lastName,
            mail: $mail
        ) 
        {
            id
        }
    }
`;

// Save Media
export const MUTATION_SAVE_MEDIA_KEY = 'saveMedia'
export const MUTATION_SAVE_MEDIA = gql`
    mutation saveMedia($title: String!, $originalTitle: String, $summary: String, $imageUrl: String, $releaseDate: Date, $rating: Float, $mediaType: MediaType!, $searchSource: SearchSource!, $searchSourceMediaId: String!) 
    { 
        saveMedia(title: $title, originalTitle: $originalTitle, summary: $summary, imageUrl: $imageUrl, releaseDate: $releaseDate, rating: $rating, mediaType: $mediaType, searchSource: $searchSource, searchSourceMediaId: $searchSourceMediaId) 
        {
            ...Media
        }
    }
    ${fragments.userMedia}
`;
