import { rule } from 'graphql-shield'
import { AuthenticationError } from 'apollo-server-express'
import { isEmpty } from 'lodash'
import getUser from 'utils/getUser'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, args, { prisma, req }, info) => {
    const { id, email } = getUser(req)
    return prisma.exists.User({ id, email }) !== null
  }
)

export const isEditor = rule({ cache: 'contextual' })(
  async (_, args, { prisma, req }, info) => {
    const { id } = getUser(req)
    const { paper } = await prisma.query.user(
      { where: { id } },
      '{paper { title }}'
    )
    return paper.title === 'EDITOR'
  }
)

export const isAdmin = rule({ cache: 'contextual' })(
  async (_, args, { prisma, req }, info) => {
    const { id } = getUser(req)
    const { paper } = await prisma.query.user(
      { where: { id } },
      '{paper { title }}'
    )
    return paper.title === 'ADMIN'
  }
)

export const isReader = rule({ cache: 'contextual' })(
  async (_, args, { prisma, req }, info) => {
    const { id } = getUser(req)
    const { paper } = await prisma.query.user(
      { where: { id } },
      '{paper { title }}'
    )
    return paper.title === 'READER'
  }
)

export const isFeedBackFromUser = rule({ cache: 'contextual' })(
  async (_, args, { prisma, req }, info) => {
    const { id } = getUser(req)
    const feedBacks = await prisma.query.feedBacks({ where: { user: { id } } })
    const filteredFeedBacks = feedBacks.filter(({ id }) => id === args.where.id)
    if (isEmpty(filteredFeedBacks)) {
      return new AuthenticationError('Feedback does not belong to this user')
    }
  }
)
