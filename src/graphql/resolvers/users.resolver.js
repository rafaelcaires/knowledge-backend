import { hash } from 'bcrypt'
import { isArray, isEmpty } from 'lodash'
import { validateUser } from 'validations/users'

export default {
  ValidateUser: {
    __resolveType: ({ errors, count }) => {
      if (errors) return 'Validate'
      if (count) return 'BatchPayload'
      return 'User'
    }
  },

  Query: {
    user: async (_, args, { prisma: { query } }, info) =>
      query.user(args, info),

    users: async (_, args, { prisma: { query } }, info) =>
      args ? query.users(args, info) : query.users(info),

    usersConnection: async (_, args, { prisma: { query } }, info) =>
      query.usersConnection(args, info)
  },

  Mutation: {
    createUser: async (
      _,
      { data },
      { prisma: { mutation }, storeUpload },
      info
    ) => {
      const errors = await validateUser(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }

      if (data.image) {
        const { filename } = await storeUpload(data.image)
        return mutation.createUser(
          {
            data: {
              ...data,
              password: await hash(data.password, 10),
              image: filename
            }
          },
          info
        )
      }
      return mutation.createUser(
        { data: { ...data, password: await hash(data.password, 10) } },
        info
      )
    },

    updateUser: async (
      _,
      { data, where },
      { prisma: { mutation }, storeUpload },
      info
    ) => {
      const errors = await validateUser(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }

      if (data.image) {
        const { filename } = await storeUpload(data.image)
        return mutation.updateUser(
          {
            data: {
              ...data,
              password: await hash(data.password, 10),
              image: filename
            },
            where
          },
          info
        )
      }
      return mutation.updateUser(
        { data: { ...data, password: await hash(data.password, 10) }, where },
        info
      )
    },

    deleteUser: async (_, args, { prisma: { mutation } }, info) =>
      mutation.deleteUser(args, info),

    upsertUser: async (
      _,
      { where, create, update },
      { prisma: { mutation } },
      info
    ) => {
      const errors = create
        ? await validateUser(create)
        : await validateUser(update)

      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.upsertUser({ where, create, update }, info)
    },

    updateManyUsers: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateUser(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateManyUsers({ data, where }, info)
    },

    deleteManyUsers: async (_, { where }, { prisma: { mutation } }, info) =>
      mutation.deleteManyUsers({ where }, info)
  },

  Subscription: {
    user: async (_, { where }, { prisma: { subscription } }, info) =>
      subscription.user({ where }, info)
  }
}
