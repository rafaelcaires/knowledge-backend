import prisma from 'config/prisma-binding'
import storeUpload from 'utils/storeUpload'

const context = req => ({ ...req, prisma, storeUpload })

export default context
