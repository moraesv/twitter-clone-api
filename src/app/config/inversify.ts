import { Container, AsyncContainerModule } from 'inversify'

import createConnection from '../db/index'

import bindRepositories from './binds/bindRepositories'
import bindServices from './binds/bindServices'

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection()

  await import('../controllers')

  bindRepositories(bind)
  bindServices(bind)
})

const createContainer = async () => {
  const container = new Container()

  await container.loadAsync(bindings)

  return container
}

export default createContainer
