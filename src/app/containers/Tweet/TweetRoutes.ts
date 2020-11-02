import { inject, injectable } from 'inversify'
import TYPES from '../../config/types'
import TweetController from './TweetController'
import { IRoute } from '../../routes'
import { auth } from '../../middlewares/auth'

@injectable()
export default class TweetRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.TweetController) private tweetController: TweetController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'get',
        path: '/tweets',
        action: this.tweetController.index.bind(this.tweetController),
        middlewares: [auth],
      },
      {
        method: 'get',
        path: '/tweets/:id',
        action: this.tweetController.show.bind(this.tweetController),
        middlewares: [auth],
      },
      {
        method: 'post',
        path: '/tweets',
        action: this.tweetController.store.bind(this.tweetController),
        middlewares: [auth],
      },
      {
        method: 'put',
        path: '/tweets/:id',
        action: this.tweetController.update.bind(this.tweetController),
        middlewares: [auth],
      },
      {
        method: 'delete',
        path: '/tweets/:id',
        action: this.tweetController.delete.bind(this.tweetController),
        middlewares: [auth],
      },
    ]
  }
}
