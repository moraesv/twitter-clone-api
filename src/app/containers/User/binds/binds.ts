import { interfaces } from 'inversify'

import userTypes from './types'

import UserController from '../UserController'
import UserRepository from '../UserRepository'
import UserRoutes from '../UserRoutes'
import UserService from '../UserService'

const userBinds = (bind: interfaces.Bind) => {
  bind<UserController>(userTypes.UserController).to(UserController)
  bind<UserRoutes>(userTypes.UserRoutes).to(UserRoutes)
  bind<UserService>(userTypes.UserService).to(UserService)
  bind(userTypes.UserRepository).toDynamicValue(() => {
    return new UserRepository()
  })
}

export default userBinds
