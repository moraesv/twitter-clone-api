import httpContext from 'express-http-context'

import UserModel from '../containers/User/UserModel'

export const setUser = (user: UserModel) => {
  httpContext.set('user', user)
}

export const getUser = (): UserModel | null => {
  return httpContext.get('user')
}
