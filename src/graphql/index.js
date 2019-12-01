import { join } from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import permissions from 'graphql/permissions'

const typesArray = fileLoader(join(__dirname, './types'))
const typeDefs = mergeTypes(typesArray, { all: true })

const resolversArray = fileLoader(join(__dirname, './resolvers'))
const resolvers = mergeResolvers(resolversArray)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default applyMiddleware(schema, permissions)
