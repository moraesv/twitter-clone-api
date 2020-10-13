import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { InversifyExpressServer } from 'inversify-express-utils'

import './database'

import './app/controllers'

import container from './app/config/inversify'

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

  public init() {
    this.midlewares()

    const server = new InversifyExpressServer(
      container,
      null,
      {
        rootPath: '/api',
      },
      this.app,
    )

    return server.build()
  }
}

export default new App()
