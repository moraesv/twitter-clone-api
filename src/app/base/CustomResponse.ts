import { Response as ResponseExpress } from 'express'
import httpStatus from 'http-status'

export interface ICustomResponse extends ResponseExpress {
  okResponse: (data: unknown) => ResponseExpress
  createdResponse: (data: unknown) => ResponseExpress
  noContentResponse: () => ResponseExpress
  notFoundResponse: (error: Error) => ResponseExpress
  badRequestResponse: (error: Error) => ResponseExpress
  unauthorizedResponse: (error: Error) => ResponseExpress
  conflictResponse: (error: Error) => ResponseExpress
  internalErrorResponse: (error: Error) => ResponseExpress
}

export default class CustomResponse {
  constructor(res: ICustomResponse) {
    this.init(res)
  }

  init(res: ResponseExpress) {
    function okResponse(data: unknown) {
      return res.status(httpStatus.OK).json(data)
    }

    function createdResponse(data: unknown) {
      return res.status(httpStatus.CREATED).json(data)
    }

    function noContentResponse() {
      return res.status(httpStatus.NO_CONTENT).send()
    }

    function notFoundResponse(error: Error) {
      return res.status(httpStatus.NOT_FOUND).json(error)
    }

    function badRequestResponse(error: Error) {
      return res.status(httpStatus.BAD_REQUEST).json(error)
    }

    function unauthorizedResponse(error: Error) {
      return res.status(httpStatus.UNAUTHORIZED).json(error)
    }

    function conflictResponse(error: Error) {
      return res.status(httpStatus.CONFLICT).json(error)
    }

    function internalErrorResponse(error: Error = { message: 'Internal server error', name: 'Internal' }) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }

    res.okResponse = okResponse
    res.createdResponse = createdResponse
    res.noContentResponse = noContentResponse
    res.notFoundResponse = notFoundResponse
    res.badRequestResponse = badRequestResponse
    res.unauthorizedResponse = unauthorizedResponse
    res.conflictResponse = conflictResponse
    res.internalErrorResponse = internalErrorResponse
  }
}
