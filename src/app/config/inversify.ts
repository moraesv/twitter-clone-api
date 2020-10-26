import { Container, AsyncContainerModule } from 'inversify'

import createConnection from '../db/index'
import bindConfigs from './binds/bindConfigs'
import bindControllers from './binds/bindControllers'

import bindRepositories from './binds/bindRepositories'
import bindRoutes from './binds/bindRoutes'
import bindServices from './binds/bindServices'

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection()

  bindRepositories(bind)
  bindServices(bind)
  bindControllers(bind)
  bindRoutes(bind)
  bindConfigs(bind)
})

const createContainer = async () => {
  const container = new Container()

  await container.loadAsync(bindings)

  return container
}

export default createContainer
