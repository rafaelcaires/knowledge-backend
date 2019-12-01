import { decode } from 'jsonwebtoken'

const getUser = req => {
  const token = req.headers.authorization
  const decoded = decode(token.replace('Bearer ', ''))
  const { id, email } = decoded

  if (id && email) {
    return decoded
  } else {
    return null
  }
}

export default getUser
