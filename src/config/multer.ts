import path from 'node:path'
import { randomBytes } from 'node:crypto'
import multer from 'multer'

const uploadPath = path.resolve('public', 'img', 'user')

const storageTypes: {
  [key: string]: multer.StorageEngine
} = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const key = `${randomBytes(16).toString('hex')}-${file.originalname}`

      cb(null, key)
    }
  })
}

const storageType = process.env.STORAGE_TYPE || 'local'

const config: multer.Options = {
  dest: uploadPath,
  storage: storageTypes[storageType],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}

export default config
