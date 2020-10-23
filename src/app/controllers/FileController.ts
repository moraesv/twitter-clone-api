import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import httpStatus from 'http-status'

import TYPES from '../config/types'

import UserService from '../services/UserService'

@injectable()
export default class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  public async index(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll()
      return res.status(httpStatus.OK).send(users)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { body } = req
      const user = await this.userService.store(body)
      return res.status(httpStatus.OK).send(user)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.userService.delete(Number(id))
      return res.status(httpStatus.NO_CONTENT).send()
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}
