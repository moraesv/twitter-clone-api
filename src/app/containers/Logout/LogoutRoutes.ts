import { inject, injectable } from 'inversify'
import TYPES from '../../config/types'
import LogoutController from './LogoutController'
import { IRoute } from '../../routes'

import logout from '../../middlewares/logout'

@injectable()
export default class LogoutRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.LogoutController) private logoutController: LogoutController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'post',
        path: '/logout',
        action: this.logoutController.store.bind(this.logoutController),
        middlewares: [logout],
      },
    ]
  }
}
