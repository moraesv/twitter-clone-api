import { Request } from 'express'
import { user } from './auth'

export default class CustomRequest {
  private req: Request

  constructor(reqponse: Request) {
    this.req = reqponse
  }

  public body() {
    return this.req.body
  }

  public routeParams() {
    return this.req.params
  }

  public queryParams() {
    return this.req.query
  }

  public file() {
    return this.req.file
  }

  public cookies() {
    return this.req.cookies
  }

  public getUser() {
    return user()
  }
}
