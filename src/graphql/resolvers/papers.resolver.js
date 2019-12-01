import { isArray, isEmpty } from 'lodash'
import { validatePaper } from 'validations/papers'

export default {
  ValidatePaper: {
    __resolveType: ({ errors, count }) => {
      if (errors) return 'Validate'
      if (count) return 'BatchPayload'
      return 'Paper'
    }
  },

  Query: {
    paper: async (_, args, { prisma: { query } }, info) =>
      query.paper(args, info),

    papers: async (_, args, { prisma: { query } }, info) =>
      args ? query.papers(args, info) : query.papers(info),

    papersConnection: async (_, args, { prisma: { query } }, info) =>
      query.papersConnection(args, info)
  },

  Mutation: {
    createPaper: async (_, { data }, { prisma: { mutation } }, info) => {
      const errors = await validatePaper(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.createPaper({ data }, info)
    },

    updatePaper: async (_, { data, where }, { prisma: { mutation } }, info) => {
      const errors = await validatePaper(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updatePaper({ data, where }, info)
    },

    deletePaper: async (_, args, { prisma: { mutation } }, info) =>
      mutation.deletePaper(args, info),

    upsertPaper: async (
      _,
      { where, create, update },
      { prisma: { mutation } },
      info
    ) => {
      const errors = create
        ? await validatePaper(create)
        : await validatePaper(update)

      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.upsertPaper({ where, create, update }, info)
    },

    updateManyPapers: async (
      _,
      { data, where },
      { prisma: { mutation } },
      info
    ) => {
      const errors = await validatePaper(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }
      return mutation.updateManyPapers({ data, where }, info)
    },

    deleteManyPapers: async (_, { where }, { prisma: { mutation } }, info) =>
      mutation.deleteManyPapers({ where }, info)
  },

  Subscription: {
    paper: async (_, { where }, { prisma: { subscription } }, info) =>
      subscription.paper({ where }, info)
  }
}
