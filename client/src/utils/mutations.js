import { gql } from "@apollo/client"


export const SAVE_BOOK = gql`
    mutation saveBook ($myInput: BookInput) { 
        saveBook (book: $myInput) { 
            _id
            username
            email
            password
            savedBooks {
                authors
                description
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation Mutation($bookId: String!) {
        deleteBook(bookID: $bookId) {
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

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
        token
        user {
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
    }
`;
export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
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
    }
`;