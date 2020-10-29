import FileModel from './FileModel'

const fileView = {
  render(file: FileModel) {
    return {
      id: file.id,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: file.url,
    }
  },
}

export default fileView
