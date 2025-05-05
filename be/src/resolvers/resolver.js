import { booksData, authorsData } from '~/data/data'

const resolvers = {
  Query: {
    books: () => {
      return booksData.map((book) => {
        const author = authorsData.find((author) => author.id == book.authorId)
        return { ...book, author }
      })
    },

    authors: () => {
      return authorsData
    },

    findBookById: (parent, { id }) => {
      return resolvers.Query.books().find((book) => book.id == id)
    },

    findBookByTitle: (parent, { title }) => {
      return resolvers.Query.books().find((book) => book.title === title)
    }
  },
  Mutation: {
    addBook: (parent, { title, authorId, publishedDate, genre, description }) => {
      const foundAuthor = authorsData.find(a => a.id === authorId)
      if (!foundAuthor) {
        throw new Error(`Author "${authorId}" does not exist.`)
      }
      const newBook = {
        id: booksData.length + 1,
        title,
        authorId,
        publishedDate,
        genre,
        description
      }
      booksData.push(newBook)
      foundAuthor.bookWrittenIds = foundAuthor.bookWrittenIds || []
      foundAuthor.bookWrittenIds.push(newBook.id)
      return newBook
    },
    updateBook: (parent, { id, title, authorId, publishedDate, genre, description }) => {
      const bookIndex = booksData.findIndex((book) => book.id === id)
      if (bookIndex === -1) return null
      const foundAuthor = authorsData.find(a => a.id === authorId)
      if (!foundAuthor) {
        throw new Error(`Author "${authorId}" does not exist.`)
      }
      const updatedBook = {
        ...booksData[bookIndex],
        ...(title !== undefined && { title }),
        ...(authorId !== undefined && { authorId }),
        ...(publishedDate !== undefined && { publishedDate }),
        ...(genre !== undefined && { genre }),
        ...(description !== undefined && { description })
      }
      booksData[bookIndex] = updatedBook
      return updatedBook
    },
    deleteBook: (parent, { id }) => {
      const bookIndex = booksData.findIndex((book) => book.id === id)
      if (bookIndex === -1) return null
      const deletedBook = booksData.splice(bookIndex, 1)[0]
      return deletedBook
    },

    addAuthor: (parent, { name, bookWrittenIds }) => {
      const newAuthor = {
        id: authorsData.length + 1,
        name,
        bookWrittenIds: [bookWrittenIds]
      }
      authorsData.push(newAuthor)
      return newAuthor
    },
    updateAuthor: (parent, { id, name, bookWrittenIds }) => {
      const authorIndex = authorsData.findIndex((author) => author.id === id)
      if (authorIndex === -1) return null
      const updatedAuthor = {
        ...authorsData[authorIndex],
        ...(name !== undefined && { name }),
        ...(bookWrittenIds !== undefined && { bookWrittenIds })
      }
      authorsData[authorIndex] = updatedAuthor
      return updatedAuthor
    },
    deleteAuthor: (parent, { id }) => {
      const authorIndex = authorsData.findIndex((author) => author.id === id)
      if (authorIndex === -1) return null
      const deletedAuthor = authorsData.splice(authorIndex, 1)[0]
      return deletedAuthor
    }
  },
  Book: {
    author: (parent) => {
      return authorsData.find(author => author.id == parent.authorId) || null
    }
  }
}

export default resolvers