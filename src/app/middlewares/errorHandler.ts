import { ErrorRequestHandler } from 'express'

import CustomResponse from '../base/CustomResponse'

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const response = new CustomResponse(res)

  return response.internalErrorResponse(error)
}

export default errorHandler
