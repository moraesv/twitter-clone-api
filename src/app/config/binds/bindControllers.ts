import { interfaces } from 'inversify'

import TYPES from '../types'

import UserController from '../../controllers/UserController'
import FileController from '../../controllers/FileController'

export default (bind: interfaces.Bind) => {
  bind<UserController>(TYPES.UserController).to(UserController)
  bind<FileController>(TYPES.FileController).to(FileController)
}
