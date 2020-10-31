import { interfaces } from 'inversify'

import tweetTypes from './types'

import TweetController from '../TweetController'
import TweetRepository from '../TweetRepository'
import TweetRoutes from '../TweetRoutes'
import TweetService from '../TweetService'

const tweetBinds = (bind: interfaces.Bind) => {
  bind<TweetController>(tweetTypes.TweetController).to(TweetController)
  bind<TweetRoutes>(tweetTypes.TweetRoutes).to(TweetRoutes)
  bind<TweetService>(tweetTypes.TweetService).to(TweetService)
  bind(tweetTypes.TweetRepository).toDynamicValue(() => {
    return new TweetRepository()
  })
}

export default tweetBinds
