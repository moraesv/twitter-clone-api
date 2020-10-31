import passport from 'passport'
import { CustomRequestHandler } from '../routes'

export const auth: CustomRequestHandler = passport.authenticate('jwt', { session: false })

export const local: CustomRequestHandler = passport.authenticate('local', { session: false })

export const anonymous: CustomRequestHandler = passport.authenticate(['jwt', 'anonymous'], { session: false })
