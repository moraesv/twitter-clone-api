import { interfaces } from 'inversify'

import TYPES from '../types'

import UserRoutes from '../../routes/UserRoutes'
import Routes from '../../routes'

export default (bind: interfaces.Bind) => {
  bind<Routes>(TYPES.Routes).to(Routes)
  bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes)
}
