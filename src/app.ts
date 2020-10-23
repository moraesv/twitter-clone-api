import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { InversifyExpressServer } from 'inversify-express-utils'

import createContainer from './app/config/inversify'
import Routes from './app/routes'
import TYPES from './app/config/types'

class App {
  public app: express.Application

  public constructor() {
    this.app = express()
  }

  private midlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan(':method :url :status :response-time'))
  }

  public async init() {
    this.midlewares()

    const container = await createContainer()

    const routes = container.get<Routes>(TYPES.Routes)

    const server = new InversifyExpressServer(container, routes.router, null, this.app, null, false)

    return server.build()
  }
}

export default new App()
