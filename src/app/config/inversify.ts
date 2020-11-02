import { Container, AsyncContainerModule } from 'inversify'

import createConnection from './db/index'

import configBinds from './binds/binds'
import baseBinds from '../base/binds/binds'
import userBinds from '../containers/User/binds/binds'
import fileBinds from '../containers/File/binds/binds'
import loginBinds from '../containers/Login/binds/binds'
import routesBinds from '../routes/binds/binds'
import tweetBinds from '../containers/Tweet/binds/binds'
import logoutBinds from '../containers/Logout/binds/binds'
import userFollowerBinds from '../containers/UserFollower/binds/binds'

export const bindings = new AsyncContainerModule(async (bind) => {
  await createConnection()

  configBinds(bind)
  baseBinds(bind)

  routesBinds(bind)
  userBinds(bind)
  fileBinds(bind)
  loginBinds(bind)
  logoutBinds(bind)
  tweetBinds(bind)
  userFollowerBinds(bind)
})

const createContainer = async () => {
  const container = new Container()

  await container.loadAsync(bindings)

  return container
}

export default createContainer
