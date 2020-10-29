import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import httpContext from 'express-http-context'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import TYPES from './app/config/types'
import createContainer from './app/config/inversify'
import jwtConfig from './app/config/jwtConfig'

import Passport from './app/base/Passport'

import errorHandler from './app/middlewares/errorHandler'

import Routes from './app/routes'

import UserRepository from './app/containers/User/UserRepository'

class App {
  public app: express.Application

  public constructor() {
    this.app = express()
  }

  private midlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan(':method :url :status :response-time :date[clf]'))
    this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
    this.app.use(httpContext.middleware)
    this.app.use(errorHandler)
  }

  private passport(container: Container): void {
    const userRepository = container.get<UserRepository>(TYPES.UserRepository)
    const jwt = container.get<typeof jwtConfig>(TYPES.jwtConfig)

    const passport = new Passport(userRepository, jwt).init()

    this.app.use(passport.initialize())

    this.app.use(passport.session())
  }

  public async init() {
    const container = await createContainer()
    const routes = container.get<Routes>(TYPES.Routes)

    this.midlewares()

    this.passport(container)

    const server = new InversifyExpressServer(
      container,
      routes.router,
      {
        rootPath: '/api',
      },
      this.app,
      null,
      false,
    )

    return server.build()
  }
}

export default new App()
