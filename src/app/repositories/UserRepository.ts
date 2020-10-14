import { getConnection, Repository } from 'typeorm'

import User from '../models/User'

export default class UserRepository extends Repository<User> {
  constructor() {
    super()
    const conn = getConnection()

    const userRepository = conn.getRepository(User)

    return userRepository
  }
}
