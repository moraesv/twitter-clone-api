import { inject, injectable } from 'inversify'
import TYPES from '../../config/types'
import LoginController from './LoginController'
import { IRoute } from '../../routes'

import { local } from '../../middlewares/auth'

@injectable()
export default class LoginRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.LoginController) private loginController: LoginController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'post',
        path: '/login',
        action: this.loginController.store.bind(this.loginController),
        middlewares: [local],
      },
    ]
  }
}
