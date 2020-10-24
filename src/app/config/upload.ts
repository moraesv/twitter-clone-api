import multer from 'multer'
import path from 'path'

const uploadConfig = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname.trim()}`

      cb(null, fileName)
    },
  }),
}

const upload = multer(uploadConfig)

export default upload
