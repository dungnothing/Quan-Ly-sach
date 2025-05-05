import { gql } from "@apollo/client"

export const getBookAPI = gql`
  query GetBooks {
    books {
      id
      title
      author {
        name
        id
      }
    }
  }
`

export const getAuthorAPI = gql`
  query GetBooks {
    authors {
      id
      name
      bookWrittenIds
    }
  }
`

// Thao tác với tác giả
export const addAuthorAPI = gql`
  mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
      id
      name
      bookWrittenIds
    }
  }
`

export const updateAuthorAPI = gql`
  mutation UpdateAuthor($name: String!, $id: Int!) {
    updateAuthor(name: $name, id: $id) {
      id
      name
      bookWrittenIds
    }
  }
`

export const deleteAuthorAPI = gql`
  mutation DeleteAuthor($id: Int!) {
    deleteAuthor(id: $id) {
      id
      name
    }
  }
`

// Thao tác với sách
export const addBookAPI = gql`
  mutation AddBook($title: String!, $authorId: Int!) {
    addBook(title: $title, authorId: $authorId) {
      id
      title
      author {
        name
      }
    }
  }
`

export const updateBookAPI = gql`
  mutation UpdateBook($title: String!, $id: Int!, $authorId: Int!) {
    updateBook(title: $title, id: $id, authorId: $authorId) {
      id
      title
      author {
        name
      }
    }
  }
`
export const deleteBookAPI = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id) {
      id
      title
      author {
        name
      }
    }
  }
`
