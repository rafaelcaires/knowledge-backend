import { Prisma } from 'prisma-binding'

export const prisma = new Prisma({
  typeDefs: process.env.PRISMA_TYPEDEFS,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET
})

export default prisma
