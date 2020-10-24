import { Request, RequestHandler, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../config/types'
/* import Request from '../base/Request'
import Response from '../base/Response' */

import UserRoutes from './UserRoutes'
import FileRoutes from './FileRoutes'
import CustomResponse from '../base/CustomResponse'
import CustomRequest from '../base/CustomRequest'

export interface IRoute {
  method: string
  path: string
  action: (req: CustomRequest, res: CustomResponse) => Promise<Response>
  middlewares: RequestHandler[]
}

@injectable()
export default class Routes {
  public routes: IRoute[][] = []

  public router: Router = null

  constructor(
    @inject(TYPES.UserRoutes) private userRoutes: UserRoutes,
    @inject(TYPES.FileRoutes) private fileRoutes: FileRoutes,
  ) {
    this.router = Router()

    this.init()
  }

  private init() {
    this.createRoutes(this.userRoutes.routes, this.fileRoutes.routes)

    this.router.use('/api', this.router)
  }

  private createRoutes(...allRoutes: IRoute[][]) {
    allRoutes.map((routes) =>
      routes.forEach((route) => {
        const action = async (req: Request, res: Response) => {
          const customRequest = new CustomRequest(req)
          const customResponse = new CustomResponse(res)

          await route.action(customRequest, customResponse)
        }
        this.router[route.method](route.path, ...route.middlewares, action)
      }),
    )
  }
}
