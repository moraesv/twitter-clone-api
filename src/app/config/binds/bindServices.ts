import { interfaces } from 'inversify'

import TYPES from '../types'

import UserService from '../../services/UserService'
import FileService from '../../services/FileService'

export default (bind: interfaces.Bind) => {
  bind<UserService>(TYPES.UserService).to(UserService)
  bind<FileService>(TYPES.FileService).to(FileService)
}
