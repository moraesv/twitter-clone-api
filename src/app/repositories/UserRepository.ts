import { Repository } from 'typeorm'

import User from '../models/User'

export default class UserRepository extends Repository<User> {}
