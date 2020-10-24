import { interfaces } from 'inversify'

import TYPES from '../types'

import UserRepository from '../../repositories/UserRepository'
import FileRepository from '../../repositories/FileRepository'

export default (bind: interfaces.Bind) => {
  bind(TYPES.UserRepository).toDynamicValue(() => {
    return new UserRepository()
  })
  bind(TYPES.FileRepository).toDynamicValue(() => {
    return new FileRepository()
  })
}
