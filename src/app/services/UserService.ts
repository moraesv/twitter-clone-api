import { inject, injectable } from 'inversify'

import TYPES from '../config/types'
import UserRepository from '../repositories/UserRepository'

@injectable()
export default class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  public findAll() {
    return this.userRepository.find()
  }

  public findById(id: number) {
    return this.userRepository.findOne(id)
  }
}
