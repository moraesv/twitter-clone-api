import { inject, injectable } from 'inversify'
import TYPES from '../config/types'
import UserController from '../controllers/UserController'
import { IRoute } from '.'

@injectable()
export default class UserRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.UserController) private userController: UserController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'get',
        path: '/users',
        action: this.userController.index.bind(this.userController),
        middlewares: [],
      },
      {
        method: 'get',
        path: '/users/:id',
        action: this.userController.show.bind(this.userController),
        middlewares: [],
      },
      {
        method: 'post',
        path: '/users',
        action: this.userController.store.bind(this.userController),
        middlewares: [],
      },
      {
        method: 'put',
        path: '/users/:id',
        action: this.userController.update.bind(this.userController),
        middlewares: [],
      },
      {
        method: 'delete',
        path: '/users/:id',
        action: this.userController.delete.bind(this.userController),
        middlewares: [],
      },
    ]
  }
}
