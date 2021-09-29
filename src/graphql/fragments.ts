// Imports
import { DocumentNode } from "@apollo/client";
import gql from "graphql-tag";

let fragments: Record<string, DocumentNode> = {};

// Define fragment for user
fragments.user = gql`
    fragment User on User {
        id,
        firstName,
        lastName,
        mail
    }
`

// Define fragment for media result
fragments.searchMediaResult =  gql`
    fragment SearchMediaResult on SearchMediaResultType {
        id
        title
        originalTitle
        summary
        imageUrl
        releaseDate
    }
`


// Export
export default fragments