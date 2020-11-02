import { inject, injectable } from 'inversify'
import TYPES from '../../config/types'
import UserFollowerController from './UserFollowerController'
import { IRoute } from '../../routes'
import { auth } from '../../middlewares/auth'

@injectable()
export default class UserFollowerRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.UserFollowerController) private userFollowerController: UserFollowerController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'get',
        path: '/users/:id/following',
        action: this.userFollowerController.following.bind(this.userFollowerController),
        middlewares: [auth],
      },
      {
        method: 'get',
        path: '/users/:id/followers',
        action: this.userFollowerController.followers.bind(this.userFollowerController),
        middlewares: [auth],
      },
      {
        method: 'post',
        path: '/users/:id/followers',
        action: this.userFollowerController.store.bind(this.userFollowerController),
        middlewares: [auth],
      },
      {
        method: 'delete',
        path: '/users/:id/followers',
        action: this.userFollowerController.delete.bind(this.userFollowerController),
        middlewares: [auth],
      },
    ]
  }
}
