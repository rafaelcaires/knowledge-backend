import { isArray, isEmpty } from 'lodash'
import { validateArticle } from 'validations/articles'

export default {
  ValidateArticle: {
    __resolveType: ({ errors, count }) => {
      if (errors) return 'Validate'
      if (count) return 'BatchPayload'
      return 'Article'
    }
  },

  Article: {
    feedbacks: async ({ id }, args, { prisma: { query } }, info) =>
      args
        ? query.feedBacks({ ...args, where: { article: { id } } }, info)
        : query.feedBacks({ where: { article: { id } } }, info)
  },

  Query: {
    article: async (_, args, { prisma: { query } }, info) =>
      query.article(args, info),

    articles: async (_, args, { prisma: { query } }, info) =>
      args ? query.articles(args, info) : query.articles(info),

    articlesConnection: async (_, args, { prisma: { query } }, info) =>
      query.articlesConnection(args, info)
  },

  Mutation: {
    createArticle: async (_, { data }, { prisma: { mutation } }, info) => {
      const errors = await validateArticle(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.createArticle({ data }, info)
    },

    updateArticle: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateArticle(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateArticle({ data, where }, info)
    },

    deleteArticle: async (_, args, { prisma: { mutation } }, info) =>
      mutation.deleteArticle(args, info),

    upsertArticle: async (
      _,
      { where, create, update },
      { prisma: { mutation } },
      info
    ) => {
      const errors = create
        ? await validateArticle(create)
        : await validateArticle(update)

      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.upsertArticle({ where, create, update }, info)
    },

    updateManyArticles: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateArticle(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateManyArticles({ data, where }, info)
    },

    deleteManyArticles: async (_, { where }, { prisma: { mutation } }, info) =>
      mutation.deleteManyArticles({ where }, info)
  },

  Subscription: {
    article: async (_, { where }, { prisma: { subscription } }, info) =>
      subscription.article({ where }, info)
  }
}
