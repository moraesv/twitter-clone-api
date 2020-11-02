import { interfaces } from 'inversify'

import CustomRequest from '../CustomRequest'
import CustomResponse from '../CustomResponse'
import Passport from '../Passport'

import baseTypes from './types'

const baseBinds = (bind: interfaces.Bind) => {
  bind(baseTypes.CustomRequest).toConstantValue(CustomRequest)
  bind(baseTypes.CustomResponse).toConstantValue(CustomResponse)
  bind(baseTypes.Passport).toConstantValue(Passport)
}

export default baseBinds
