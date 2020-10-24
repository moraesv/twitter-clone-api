import { inject, injectable } from 'inversify'

import TYPES from '../config/types'

import FileRepository from '../repositories/FileRepository'
import UserRepository from '../repositories/UserRepository'

@injectable()
export default class FileService {
  constructor(
    @inject(TYPES.FileRepository) private fileRepository: FileRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
  ) {}

  public async findByIdAndName(id: number, filename: string) {
    return this.fileRepository.findOne({
      where: {
        id,
        filename,
      },
    })
  }

  public async store(file: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id: 1 } })

    return this.fileRepository.save({ ...file, user })
  }

  public async delete(id: number) {
    await this.fileRepository.softDelete(id)
  }

  public async setTemporary(id: number, temporary = false) {
    return this.fileRepository.update(id, {
      temporary,
    })
  }
}
