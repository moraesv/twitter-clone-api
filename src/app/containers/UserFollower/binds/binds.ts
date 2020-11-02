import { interfaces } from 'inversify'

import userFollowerTypes from './types'

import UserFollowerController from '../UserFollowerController'
import UserFollowerRoutes from '../UserFollowerRoutes'
import UserFollowerService from '../UserFollowerService'

const userFollowerBinds = (bind: interfaces.Bind) => {
  bind<UserFollowerController>(userFollowerTypes.UserFollowerController).to(UserFollowerController)
  bind<UserFollowerRoutes>(userFollowerTypes.UserFollowerRoutes).to(UserFollowerRoutes)
  bind<UserFollowerService>(userFollowerTypes.UserFollowerService).to(UserFollowerService)
}

export default userFollowerBinds
