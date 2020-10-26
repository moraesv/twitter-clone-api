import { interfaces } from 'inversify'

import TYPES from '../types'

import UserController from '../../controllers/UserController'
import FileController from '../../controllers/FileController'
import LoginController from '../../controllers/LoginController'

export default (bind: interfaces.Bind) => {
  bind<UserController>(TYPES.UserController).to(UserController)
  bind<FileController>(TYPES.FileController).to(FileController)
  bind<LoginController>(TYPES.LoginController).to(LoginController)
}
