declare namespace Express {
  interface Request {}
  export interface Response {
    okResponse: any
    createdResponse: any
    noContentResponse: any
    notFoundResponse: any
    badRequestResponse: any
    unauthorizedResponse: any
    conflictResponse: any
    internalErrorResponse: any
  }
}
