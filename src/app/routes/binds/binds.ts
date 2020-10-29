import { interfaces } from 'inversify'

import routesTypes from './types'

import Routes from '..'

const routesBinds = (bind: interfaces.Bind) => {
  bind<Routes>(routesTypes.Routes).to(Routes)
}

export default routesBinds
