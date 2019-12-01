import prisma from 'config/prisma-binding'
import getUser from 'utils/getUser'

const isAuth = async (req, res, next) => {
  const tokedDecoded = getUser(req)
  if (tokedDecoded) {
    const { id, email } = tokedDecoded
    const user = id && email ? await prisma.exists.User({ id, email }) : null
    if (!user) return res.json({ message: 'User Not Authorized' })
    next()
  } else {
    return res.json({ message: 'User Not Authorized' })
  }
}

export default isAuth
