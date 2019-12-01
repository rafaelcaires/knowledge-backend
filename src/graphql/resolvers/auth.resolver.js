/* eslint-disable indent */
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { isArray, isEmpty } from 'lodash'
import { validateUser } from 'validations/users'

export default {
  ValidateAuth: {
    __resolveType: ({ errors }) => (errors ? 'Validate' : 'Auth')
  },

  Mutation: {
    signin: async (_, { data: { email, password } }, { prisma: { query } }) => {
      const user = await query.user({ where: { email } })
      if (!user || !(await compare(password, user.password))) {
        throw new AuthenticationError('Usário ou senha inválida')
      }

      const payload = { id: user.id, email: user.email }
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })
      return { token, user }
    },

    signup: async (
      _,
      { data },
      { prisma: { mutation }, storeUpload },
      info
    ) => {
      const errors = await validateUser(data)
      if (isArray(errors) && !isEmpty(errors)) return { errors }

      const user = data.image
        ? await mutation.createUser(
            {
              data: {
                ...data,
                password: await hash(data.password, 10),
                image: await storeUpload(data.image).filename
              }
            },
            info
          )
        : await mutation.createUser(
            { data: { ...data, password: await hash(data.password, 10) } },
            '{ id name email password createdAt updatedAt }'
          )

      const payload = { id: user.id, email: user.email }
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      return { token, user }
    }
  }
}
