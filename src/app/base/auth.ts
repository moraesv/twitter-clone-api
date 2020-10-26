import httpContext from 'express-http-context'

import UserModel from '../models/UserModel'

export const setUser = (user: UserModel) => {
  httpContext.set('user', user)
}

export const user = (): UserModel | null => {
  return httpContext.get('user')
}
