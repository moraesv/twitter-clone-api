import { NextFunction, Request, Response, Router, RequestHandler } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../config/types'

import CustomResponse from '../base/CustomResponse'
import CustomRequest from '../base/CustomRequest'

import UserRoutes from '../containers/User/UserRoutes'
import FileRoutes from '../containers/File/FileRoutes'
import LoginRoutes from '../containers/Login/LoginRoutes'
import TweetRoutes from '../containers/Tweet/TweetRoutes'
import LogoutRoutes from '../containers/Logout/LogoutRoutes'

export interface CustomRequestHandler {
  (req: CustomRequest, res: CustomResponse, next: NextFunction): any
}

export interface IRoute {
  method: string
  path: string
  action: (req: CustomRequest, res: CustomResponse) => Promise<Response> | Response
  middlewares: (CustomRequestHandler | RequestHandler)[]
}

@injectable()
export default class Routes {
  public routes: IRoute[][] = []

  public router: Router = null

  constructor(
    @inject(TYPES.UserRoutes) private userRoutes: UserRoutes,
    @inject(TYPES.FileRoutes) private fileRoutes: FileRoutes,
    @inject(TYPES.LoginRoutes) private loginRoutes: LoginRoutes,
    @inject(TYPES.LogoutRoutes) private logoutRoutes: LogoutRoutes,
    @inject(TYPES.TweetRoutes) private tweetRoutes: TweetRoutes,
  ) {
    this.router = Router()

    this.init()
  }

  private init() {
    this.createRoutes(
      this.userRoutes.routes,
      this.fileRoutes.routes,
      this.loginRoutes.routes,
      this.tweetRoutes.routes,
      this.logoutRoutes.routes,
    )
  }

  private createRoutes(...allRoutes: IRoute[][]) {
    function instanceOfCustomRequestHandler(object: any): object is CustomRequestHandler {
      return 'member' in object
    }

    allRoutes.map((routes) =>
      routes.forEach((route) => {
        const action = async (req: Request, res: Response) => {
          const customRequest = new CustomRequest(req)
          const customResponse = new CustomResponse(res)

          await route.action(customRequest, customResponse)
        }
        const middlewares = route.middlewares.map((middleware) => {
          return async (req: Request, res: Response, next: NextFunction) => {
            const customRequest = new CustomRequest(req)
            const customResponse = new CustomResponse(res)

            if (instanceOfCustomRequestHandler(middleware)) {
              return middleware(customRequest, customResponse, next)
            }

            return middleware(req, res, next)
          }
        })

        this.router[route.method](route.path, ...middlewares, action)
      }),
    )
  }
}
