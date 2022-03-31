// Imports
import { DocumentNode } from "@apollo/client";
import gql from "graphql-tag";

let fragments: Record<string, DocumentNode> = {};

// Define fragment for user media
fragments.userMedia = gql`
    fragment Media on Media {
        id,
        title,
        originalTitle
        summary
        imageUrl
        releaseDate
        rating,
        searchSource,
        searchSourceMediaId
    }
`

// Define fragment for user
fragments.user = gql`
    fragment User on User {
        id,
        firstName,
        lastName,
        mail,
        medias {
            ...Media
        }
    }
    ${fragments.userMedia}
`

// Define fragment for media result
fragments.searchMediaResult =  gql`
    fragment SearchMediaResult on SearchMediaResultType {
        title
        originalTitle
        summary
        imageUrl
        releaseDate
        rating,
        searchSource,
        searchSourceMediaId
    }
`


// Export
export default fragments