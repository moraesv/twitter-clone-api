import { getConnection, Repository } from 'typeorm'

import FileModel from './FileModel'

export default class FileRepository extends Repository<FileModel> {
  constructor() {
    super()
    const conn = getConnection()

    const fileRepository = conn.getRepository(FileModel)

    return fileRepository
  }
}
