import { createWriteStream, unlink } from 'fs'
import mkdirp from 'mkdirp'

const UPLOAD_DIR = './uploads'
mkdirp(UPLOAD_DIR)

export default async upload => {
  const { createReadStream, filename, mimetype } = await upload
  const stream = createReadStream()
  const path = `${UPLOAD_DIR}/${filename}`
  const file = { filename, mimetype, path }

  await new Promise((resolve, reject) => {
    stream
      .on('error', error => {
        unlink(path, () => {
          reject(error)
        })
      })
      .pipe(createWriteStream(path))
      .on('error', reject)
      .on('finish', resolve)
  })

  return file
}
