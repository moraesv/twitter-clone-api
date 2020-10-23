import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../config/types'
/* import Request from '../base/Request'
import Response from '../base/Response' */

import UserRoutes from './UserRoutes'

export interface IRoute {
  method: string
  path: string
  action: (req: Request, res: Response) => Promise<Response>
  middlewares: (() => void)[]
}

@injectable()
export default class Routes {
  public routes: IRoute[][] = []

  public router: Router = null

  constructor(@inject(TYPES.UserRoutes) private userRoutes: UserRoutes) {
    this.router = Router()

    this.init()
  }

  private init() {
    this.createRoutes(this.userRoutes.routes)

    /*
router.use('/', (request, response, next) => {
    new Request(request)
  new Response(response)

  next()
}) */

    this.router.use('/api', this.router)
  }

  private createRoutes(...allRoutes: IRoute[][]) {
    allRoutes.map((routes) =>
      routes.forEach((route) => this.router[route.method](route.path, ...route.middlewares, route.action)),
    )
  }
}
