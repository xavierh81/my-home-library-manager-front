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


// Export
export default fragments