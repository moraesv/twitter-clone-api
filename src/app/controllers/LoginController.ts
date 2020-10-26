import { inject, injectable } from 'inversify'
import jwt, { SignOptions } from 'jsonwebtoken'

import { CookieOptions } from 'express'
import TYPES from '../config/types'

import CustomResponse from '../base/CustomResponse'
import CustomRequest from '../base/CustomRequest'
import jwtCfg from '../config/jwtConfig'
import cookieCfg from '../config/cookieConfig'

@injectable()
export default class LoginController {
  constructor(
    @inject(TYPES.jwtConfig) private jwtConfig: typeof jwtCfg,
    @inject(TYPES.cookieConfig) private cookieConfig: typeof cookieCfg,
  ) {}

  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      const user = req.getUser()

      const { secret, ...options } = this.jwtConfig

      const data = {
        id: user.id,
      }

      const token = jwt.sign({ data }, secret, options as SignOptions)

      res.cookie('access_token', `Bearer ${token}`, this.cookieConfig as CookieOptions)

      return res.noContentResponse()
    } catch (e) {
      return res.internalErrorResponse()
    }
  }
}
