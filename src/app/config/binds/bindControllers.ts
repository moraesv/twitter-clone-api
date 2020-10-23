import { interfaces } from 'inversify'

import TYPES from '../types'

import UserController from '../../controllers/UserController'

export default (bind: interfaces.Bind) => {
  bind<UserController>(TYPES.UserController).to(UserController)
}
