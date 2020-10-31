import { getConnection, Repository } from 'typeorm'

import TweetModel from './TweetModel'

export default class TweetRepository extends Repository<TweetModel> {
  constructor() {
    super()
    const conn = getConnection()

    const tweetRepository = conn.getRepository<TweetModel>(TweetModel)

    return tweetRepository
  }
}
