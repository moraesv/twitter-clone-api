import { inject, injectable } from 'inversify'

import TYPES from '../../config/types'
import validateSchema from '../../utils/validateSchema'
import UserRepository from '../User/UserRepository'

import TweetModel from './TweetModel'
import TweetRepository from './TweetRepository'

import tweetView from './tweetView'
import tweetStoreSchema from './validation/store'
import tweetUpdateSchema from './validation/update'

@injectable()
export default class TweetService {
  constructor(
    @inject(TYPES.TweetRepository) private tweetRepository: TweetRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
  ) {}

  public async findAll() {
    const tweets = await this.tweetRepository.find()

    return tweets.map((tweet) => tweetView.render(tweet))
  }

  public async findById(id: number) {
    const tweet = await this.tweetRepository.findOne(id)

    return tweetView.render(tweet)
  }

  public async storeValidate(body: TweetModel) {
    return validateSchema<typeof tweetStoreSchema, TweetModel>(tweetStoreSchema, body)
  }

  public async store(tweet: TweetModel) {
    const user = await this.userRepository.findOne({ where: { id: 1 } })

    const createdTweet = await this.tweetRepository.save({ ...tweet, user })

    return tweetView.render(createdTweet)
  }

  public async updateValidate(body: TweetModel) {
    return validateSchema<typeof tweetUpdateSchema, TweetModel>(tweetUpdateSchema, body)
  }

  public async update(id: number, tweet: TweetModel) {
    await this.tweetRepository.update(id, tweet)

    const updatedTweet = await this.tweetRepository.findOne(id)

    return tweetView.render(updatedTweet)
  }

  public async delete(id: number) {
    await this.tweetRepository.softDelete(id)
  }
}
