import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'

import TYPES from '../config/types'

import UserService from '../services/UserService'

@controller('/users')
export default class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public index() {
    return this.userService.findAll()
  }
}
