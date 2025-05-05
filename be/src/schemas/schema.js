
const typeDefs = `#graphql
  type Book {
    id: Int!
    title: String!
    author: Author
    authorId: Int!
    publishedDate: DateTime
    genre: String
    description: String
  }

  type Author {
    id: Int!
    name: String!
    bookWrittenIds: [Int]
  }

  type Query {
    books: [Book]
    findBookById(id: Int!): Book
    findBookByTitle(title: String!): Book

    authors: [Author]
    findAuthorById(id: Int!): Author
    findAuthorByName(name: String!): Author
  }

  type Mutation {
    addBook(title: String!, authorId: Int!, publishedDate: DateTime, genre: String, description: String): Book
    updateBook(id: Int!, authorId: Int!, title: String, publishedDate: DateTime, genre: String, description: String): Book
    deleteBook(id: Int!): Book

    addAuthor(name: String!, bookWrittenIds: Int): Author
    updateAuthor(id: Int!, name: String, bookWrittenIds: [Int]): Author
    deleteAuthor(id: Int!): Author
  }
  scalar DateTime
`

export default typeDefs
