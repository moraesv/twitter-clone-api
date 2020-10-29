import { Container, AsyncContainerModule } from 'inversify'

import createConnection from './db/index'

import configBinds from './binds/binds'
import userBinds from '../containers/User/binds/binds'
import fileBinds from '../containers/File/binds/binds'
import loginBinds from '../containers/Login/binds/binds'
import routesBinds from '../routes/binds/binds'

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection()

  configBinds(bind)

  routesBinds(bind)
  userBinds(bind)
  fileBinds(bind)
  loginBinds(bind)
})

const createContainer = async () => {
  const container = new Container()

  await container.loadAsync(bindings)

  return container
}

export default createContainer
