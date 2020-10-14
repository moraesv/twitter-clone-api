import { interfaces } from 'inversify'

import TYPES from '../types'

import UserService from '../../services/UserService'

export default (bind: interfaces.Bind) => {
  bind<UserService>(TYPES.UserService).to(UserService).inRequestScope()
}
