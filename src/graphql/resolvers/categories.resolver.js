import { isArray, isEmpty } from 'lodash'
import { validateCategory } from 'validations/categories'

export default {
  ValidateCategory: {
    __resolveType: ({ errors, count }) => {
      if (errors) return 'Validate'
      if (count) return 'BatchPayload'
      return 'Category'
    }
  },

  Query: {
    category: async (_, args, { prisma: { query } }, info) =>
      query.category(args, info),

    categories: async (_, args, { prisma: { query } }, info) =>
      args ? query.categories(args, info) : query.categories(info),

    categoriesConnection: async (_, args, { prisma: { query } }, info) =>
      query.categoriesConnection(args, info)
  },

  Mutation: {
    createCategory: async (_, { data }, { prisma: { mutation } }, info) => {
      const errors = await validateCategory(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.createCategory({ data }, info)
    },

    updateCategory: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateCategory(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateCategory({ data, where }, info)
    },

    deleteCategory: async (_, args, { prisma: { mutation } }, info) =>
      mutation.deleteCategory(args, info),

    upsertCategory: async (
      _,
      { where, create, update },
      { prisma: { mutation } },
      info
    ) => {
      const errors = create
        ? await validateCategory(create)
        : await validateCategory(update)

      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.upsertCategory({ where, create, update }, info)
    },

    updateManyCategories: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateCategory(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateManyCategories({ data, where }, info)
    },

    deleteManyCategories: async (
      _,
      { where },
      { prisma: { mutation } },
      info
    ) => mutation.deleteManyCategories({ where }, info)
  },

  Subscription: {
    category: async (_, { where }, { prisma: { subscription } }, info) =>
      subscription.category({ where }, info)
  }
}
