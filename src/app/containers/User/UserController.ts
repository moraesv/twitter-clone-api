import { inject, injectable } from 'inversify'

import UserService from './UserService'

import CustomRequest from '../../base/CustomRequest'
import CustomResponse from '../../base/CustomResponse'
import TYPES from '../../config/types'

@injectable()
export default class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  public async index(req: CustomRequest, res: CustomResponse) {
    try {
      const users = await this.userService.findAll()
      return res.okResponse(users)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async show(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const user = await this.userService.findById(Number(id))
      return res.okResponse(user)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      const body = req.body()

      const { ready, errors, hasErrors } = await this.userService.storeValidate(body)

      if (hasErrors) {
        return res.badRequestResponse(errors)
      }

      const user = await this.userService.store(ready)
      return res.okResponse(user)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async update(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      const body = req.body()

      const { ready, errors, hasErrors } = await this.userService.updateValidate(body)

      if (hasErrors) {
        return res.badRequestResponse(errors)
      }

      const user = await this.userService.update(Number(id), ready)
      return res.okResponse(user)
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }

  public async delete(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      await this.userService.delete(Number(id))
      return res.noContentResponse()
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }
}
