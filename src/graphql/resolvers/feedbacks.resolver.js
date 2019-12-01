import { isArray, isEmpty } from 'lodash'
import { validateFeedBack } from 'validations/feedbacks'

export default {
  ValidateFeedBack: {
    __resolveType: ({ errors, count }) => {
      if (errors) return 'Validate'
      if (count) return 'BatchPayload'
      return 'FeedBack'
    }
  },

  Query: {
    feedBack: async (_, args, { prisma: { query } }, info) =>
      query.feedBack(args, info),

    feedBacks: async (_, args, { prisma: { query } }, info) =>
      args ? query.feedBacks(args, info) : query.feedBacks(info),

    feedBacksConnection: async (_, args, { prisma: { query } }, info) =>
      query.feedBacksConnection(args, info)
  },

  Mutation: {
    createFeedBack: async (_, { data }, { prisma: { mutation } }, info) => {
      const errors = await validateFeedBack(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.createFeedBack({ data }, info)
    },

    updateFeedBack: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateFeedBack(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateFeedBack({ data, where }, info)
    },

    deleteFeedBack: async (_, args, { prisma: { mutation } }, info) =>
      mutation.deleteFeedBack(args, info),

    upsertFeedBack: async (
      _,
      { where, create, update },
      { prisma: { mutation } },
      info
    ) => {
      const errors = create
        ? await validateFeedBack(create)
        : await validateFeedBack(update)

      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.upsertFeedBack({ where, create, update }, info)
    },

    updateManyFeedBacks: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validateFeedBack(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateManyFeedBacks({ data, where }, info)
    },

    deleteManyFeedBacks: async (_, { where }, { prisma: { mutation } }, info) =>
      mutation.deleteManyFeedBacks({ where }, info)
  },

  Subscription: {
    feedBack: async (_, { where }, { prisma: { subscription } }, info) =>
      subscription.feedBack({ where }, info)
  }
}
