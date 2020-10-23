import { getConnection, Repository } from 'typeorm'

import File from '../models/File'

export default class FileRepository extends Repository<File> {
  constructor() {
    super()
    const conn = getConnection()

    const fileRepository = conn.getRepository(File)

    return fileRepository
  }
}
