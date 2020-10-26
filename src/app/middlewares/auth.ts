import passport from 'passport'

export const auth = passport.authenticate('jwt', { session: false })

export const local = passport.authenticate('local', { session: false })

export const anonymous = passport.authenticate(['jwt', 'anonymous'], { session: false })

export const api = passport.authenticate('jwt', { session: false })
