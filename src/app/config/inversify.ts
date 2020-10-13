import { Container } from 'inversify'

import TYPES from './types'

import UserService from '../services/UserService'

const container = new Container()
container.bind<UserService>(TYPES.UserService).to(UserService)

export default container
