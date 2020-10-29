import { getConnection, Repository } from 'typeorm'

import UserModel from './UserModel'

export default class UserRepository extends Repository<UserModel> {
  constructor() {
    super()
    const conn = getConnection()

    const userRepository = conn.getRepository<UserModel>(UserModel)

    return userRepository
  }
}
