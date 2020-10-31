import { Request } from 'express'
import UserModel from '../containers/User/UserModel'
import { setUser, getUser } from './auth'

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
    return getUser()
  }

  public setUser(user: UserModel) {
    return setUser(user)
  }
}
