import { Request, Response } from 'express'
import { inject } from 'inversify'
import httpStatus from 'http-status'
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils'

import TYPES from '../config/types'

import UserService from '../services/UserService'

@controller('/users')
export default class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public index(req: Request, res: Response) {
    try {
      return this.userService.findAll()
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @httpGet('/:id')
  public show(req: Request, res: Response) {
    try {
      const { id } = req.params
      return this.userService.findById(Number(id))
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @httpPost('/')
  public store(req: Request, res: Response) {
    try {
      const { body } = req
      return this.userService.store(body)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @httpPut('/:id')
  public update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { body } = req
      return this.userService.update(Number(id), body)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @httpDelete('/:id')
  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      return this.userService.delete(Number(id))
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}
