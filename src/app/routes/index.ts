import { Request, RequestHandler, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../config/types'

import CustomResponse from '../base/CustomResponse'
import CustomRequest from '../base/CustomRequest'

import UserRoutes from '../containers/User/UserRoutes'
import FileRoutes from '../containers/File/FileRoutes'
import LoginRoutes from '../containers/Login/LoginRoutes'

export interface IRoute {
  method: string
  path: string
  action: (req: CustomRequest, res: CustomResponse) => Promise<Response> | Response
  middlewares: RequestHandler[]
}

@injectable()
export default class Routes {
  public routes: IRoute[][] = []

  public router: Router = null

  constructor(
    @inject(TYPES.UserRoutes) private userRoutes: UserRoutes,
    @inject(TYPES.FileRoutes) private fileRoutes: FileRoutes,
    @inject(TYPES.LoginRoutes) private loginRoutes: LoginRoutes,
  ) {
    this.router = Router()

    this.init()
  }

  private init() {
    this.createRoutes(this.userRoutes.routes, this.fileRoutes.routes, this.loginRoutes.routes)
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
