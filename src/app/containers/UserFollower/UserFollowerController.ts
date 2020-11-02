import { inject, injectable } from 'inversify'

import UserFollowerService from './UserFollowerService'

import CustomRequest from '../../base/CustomRequest'
import CustomResponse from '../../base/CustomResponse'
import TYPES from '../../config/types'

@injectable()
export default class UserFollowerController {
  constructor(@inject(TYPES.UserFollowerService) private userFollowerService: UserFollowerService) {}

  public async following(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const userFollowers = await this.userFollowerService.following(Number(id))
      return res.okResponse(userFollowers)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async followers(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const userFollowers = await this.userFollowerService.followers(Number(id))
      return res.okResponse(userFollowers)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const user = req.getUser()

      const userFollower = await this.userFollowerService.store(Number(id), user)
      return res.okResponse(userFollower)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async delete(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const user = req.getUser()

      const userFollower = await this.userFollowerService.delete(Number(id), user)
      return res.okResponse(userFollower)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }
}
