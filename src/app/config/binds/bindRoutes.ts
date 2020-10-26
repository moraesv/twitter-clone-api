import { interfaces } from 'inversify'

import TYPES from '../types'

import UserRoutes from '../../routes/UserRoutes'
import Routes from '../../routes'
import FileRoutes from '../../routes/FileRoutes'
import LoginRoutes from '../../routes/LoginRoutes'

export default (bind: interfaces.Bind) => {
  bind<Routes>(TYPES.Routes).to(Routes)
  bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes)
  bind<FileRoutes>(TYPES.FileRoutes).to(FileRoutes)
  bind<LoginRoutes>(TYPES.LoginRoutes).to(LoginRoutes)
}
