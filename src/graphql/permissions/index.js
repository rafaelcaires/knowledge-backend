import { shield, not, or, and } from 'graphql-shield'
import {
  isAuthenticated,
  isAdmin,
  isEditor,
  isReader,
  isFeedBackFromUser
} from 'graphql/permissions/rules'

const permissions = shield({
  Query: {
    articlesConnection: or(isAdmin, isEditor),

    // Users
    // user: or(isAdmin, isEditor),
    // users: or(isAdmin, isEditor, isReader),
    // usersConnection: or(isAdmin, isEditor),

    // Papers
    // paper: or(isAdmin, isEditor),
    // papers: or(isAdmin, isEditor),
    // papersConnection: or(isAdmin, isEditor),

    // Categories
    // category: or(isAdmin, isEditor),
    // categories: or(isAdmin, isEditor),
    // categoriesConnection: or(isAdmin, isEditor),

    // FeedBacks
    feedBack: or(isAdmin, isEditor),
    feedBacks: or(isAdmin, isEditor, isReader),
    feedBacksConnection: or(isAdmin, isEditor)
  },

  Mutation: {
    // Articles
    createArticle: or(isAdmin, isEditor, isAuthenticated),
    updateArticle: or(isAdmin, isEditor),
    deleteArticle: or(isAdmin, isEditor),
    upsertArticle: or(isAdmin, isEditor),
    updateManyArticles: or(isAdmin, isEditor),
    deleteManyArticles: or(isAdmin, isEditor),

    // Users
    // createUser: isAdmin,
    updateUser: or(isAdmin, isAuthenticated),
    deleteUser: isAdmin,
    upsertUser: isAdmin,
    updateManyUsers: isAdmin,
    deleteManyUsers: isAdmin,

    // Papers
    createPaper: or(isAdmin, isAuthenticated),
    updatePaper: or(isAdmin, isAuthenticated),
    deletePaper: isAdmin,
    upsertPaper: or(isAdmin, isAuthenticated),
    updateManyPapers: or(isAdmin, isAuthenticated),
    deleteManyPapers: isAdmin,

    // Categories
    createCategory: or(isAdmin, isAuthenticated),
    updateCategory: or(isAdmin, isAuthenticated),
    deleteCategory: isAdmin,
    upsertCategory: isAdmin,
    updateManyCategories: isAdmin,
    deleteManyCategories: isAdmin,

    // FeedBacks
    createFeedBack: or(isAdmin, isEditor, isReader),
    updateFeedBack: or(isAdmin, isEditor, and(isReader, isFeedBackFromUser)),
    deleteFeedBack: or(isAdmin, isEditor, and(isReader, isFeedBackFromUser)),
    upsertFeedBack: isAdmin,
    updateManyFeedBacks: isAdmin,
    deleteManyFeedBacks: isAdmin,

    // Authentication
    signin: not(isAuthenticated),
    signup: not(isAuthenticated)
  }
})

export default permissions
