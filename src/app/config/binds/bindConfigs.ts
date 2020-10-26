import { interfaces } from 'inversify'

import TYPES from '../types'

import appConfig from '../appConfig'
import jwtConfig from '../jwtConfig'
import cookieConfig from '../cookieConfig'

export default (bind: interfaces.Bind) => {
  bind(TYPES.appConfig).toConstantValue(appConfig)
  bind(TYPES.jwtConfig).toConstantValue(jwtConfig)
  bind(TYPES.cookieConfig).toConstantValue(cookieConfig)
}
