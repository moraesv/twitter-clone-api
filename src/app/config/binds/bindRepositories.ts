import { interfaces } from 'inversify'

import TYPES from '../types'

import UserRepository from '../../repositories/UserRepository'

export default (bind: interfaces.Bind) => {
  bind(TYPES.UserRepository)
    .toDynamicValue(() => {
      return new UserRepository()
    })
    .inRequestScope()
}
