import { inject, injectable } from 'inversify'

import TweetService from './TweetService'

import CustomRequest from '../../base/CustomRequest'
import CustomResponse from '../../base/CustomResponse'
import TYPES from '../../config/types'

@injectable()
export default class TweetController {
  constructor(@inject(TYPES.TweetService) private tweetService: TweetService) {}

  public async index(req: CustomRequest, res: CustomResponse) {
    try {
      const tweets = await this.tweetService.findAll()
      return res.okResponse(tweets)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async show(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const tweet = await this.tweetService.findById(Number(id))
      return res.okResponse(tweet)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      const body = req.body()

      const { ready, errors, hasErrors } = await this.tweetService.storeValidate(body)

      if (hasErrors) {
        return res.badRequestResponse(errors)
      }

      const tweet = await this.tweetService.store(ready)
      return res.okResponse(tweet)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async update(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const body = req.body()

      const { ready, errors, hasErrors } = await this.tweetService.updateValidate(body)

      if (hasErrors) {
        return res.badRequestResponse(errors)
      }

      const tweet = await this.tweetService.update(Number(id), ready)
      return res.okResponse(tweet)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async delete(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      await this.tweetService.delete(Number(id))
      return res.noContentResponse()
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }
}
