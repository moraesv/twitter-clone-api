import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import CustomRequest from '../base/CustomRequest'

import CustomResponse from '../base/CustomResponse'
import cookieConfig from '../config/cookieConfig'
import { CustomRequestHandler } from '../routes'

const logout: CustomRequestHandler = (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  res.clearCookie('access_token', cookieConfig)
  next()
}

export default logout
