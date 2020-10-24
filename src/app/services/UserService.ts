import { inject, injectable } from 'inversify'

import TYPES from '../config/types'

import UserModel from '../models/UserModel'

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

  public store(user: UserModel) {
    return this.userRepository.save(user)
  }

  public async update(id: number, user: UserModel) {
    await this.userRepository.update(id, user)

    return this.userRepository.findOne(id)
  }

  public async delete(id: number) {
    await this.userRepository.softDelete(id)
  }
}
