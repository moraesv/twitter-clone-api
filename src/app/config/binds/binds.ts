import { interfaces } from 'inversify'

import appConfig from '../appConfig'
import jwtConfig from '../jwtConfig'
import cookieConfig from '../cookieConfig'

import configTypes from './types'

const configBinds = (bind: interfaces.Bind) => {
  bind(configTypes.appConfig).toConstantValue(appConfig)
  bind(configTypes.jwtConfig).toConstantValue(jwtConfig)
  bind(configTypes.cookieConfig).toConstantValue(cookieConfig)
}

export default configBinds
