/*eslint-disable no-console */

import typeDefs from './schemas/schema'
import resolvers from './resolvers/resolver'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const port = process.env.PORT || 4000

startStandaloneServer(server, {
  listen: { port },
  context: async ({ req }) => ({ token: req.headers.authorization }),
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})

console.log(`🚀  Server ready at: http://localhost:${port}/graphql`)
