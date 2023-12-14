import { gql } from "@apollo/client"

export const GET_MYUSER = gql`
    query Query {
        me {
        _id
        username
        email
        password
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
        }
    }
`;