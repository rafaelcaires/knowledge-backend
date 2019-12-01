import { GraphQLUpload } from 'graphql-upload'

export default {
  Upload: GraphQLUpload,

  Query: {
    uploads: (parent, args) => {}
  },

  Mutation: {
    singleUpload: (parent, { file }, { storeUpload }) => {
      console.log(file)
      return storeUpload(file)
    }
  }
}
