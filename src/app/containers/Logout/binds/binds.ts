import { interfaces } from 'inversify'

import LogoutController from '../LogoutController'

import logoutTypes from './types'
import LogoutRoutes from '../LogoutRoutes'

const logoutBinds = (bind: interfaces.Bind) => {
  bind<LogoutController>(logoutTypes.LogoutController).to(LogoutController)
  bind<LogoutRoutes>(logoutTypes.LogoutRoutes).to(LogoutRoutes)
}

export default logoutBinds
