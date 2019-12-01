import path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import schema from 'graphql'
import context from 'utils/apolloContext'
import isAuth from 'utils/isAuth'

const server = new ApolloServer({
  schema,
  context,
  debug: false,
  cors: true,
  uploads: {
    maxFileSize: 10000000,
    maxFiles: 20
  }
})

const app = express()
app.use('/files', isAuth, express.static(path.join(__dirname, '../uploads')))
server.applyMiddleware({ app, path: '/graphql' })

app.listen(process.env.PORT, () =>
  console.info(
    `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
)
