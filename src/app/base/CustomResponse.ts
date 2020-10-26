import { CookieOptions, Response } from 'express'
import httpStatus from 'http-status'

export default class CustomResponse {
  private res: Response

  constructor(response: Response) {
    this.res = response
  }

  public okResponse(data: unknown) {
    return this.res.status(httpStatus.OK).json(data)
  }

  public createdResponse(data: unknown) {
    return this.res.status(httpStatus.CREATED).json(data)
  }

  public noContentResponse() {
    return this.res.status(httpStatus.NO_CONTENT).send()
  }

  public notFoundResponse(error: Error) {
    return this.res.status(httpStatus.NOT_FOUND).json(error)
  }

  public badRequestResponse(error: Error) {
    return this.res.status(httpStatus.BAD_REQUEST).json(error)
  }

  public unauthorizedResponse(error: Error) {
    return this.res.status(httpStatus.UNAUTHORIZED).json(error)
  }

  public conflictResponse(error: Error) {
    return this.res.status(httpStatus.CONFLICT).json(error)
  }

  public internalErrorResponse(error: Error = { message: 'Internal server error', name: 'Internal' }) {
    console.error(error)

    return this.res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
  }

  public cookie(name: string, val: string, options: CookieOptions) {
    return this.res.cookie(name, val, options)
  }
}
