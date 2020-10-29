import { interfaces } from 'inversify'

import LoginController from '../LoginController'

import loginTypes from './types'
import LoginRoutes from '../LoginRoutes'

const loginBinds = (bind: interfaces.Bind) => {
  bind<LoginController>(loginTypes.LoginController).to(LoginController)
  bind<LoginRoutes>(loginTypes.LoginRoutes).to(LoginRoutes)
}

export default loginBinds
