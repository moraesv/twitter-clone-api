import connectMemcached from 'connect-memcached'
import session from 'express-session'
import appConfig from './appConfig'

const MemcachedStore = connectMemcached(session)

const sessionConfig = {
  store: new MemcachedStore({ hosts: process.env.SESSION_HOST }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: appConfig.environment === 'production' },
}

export default sessionConfig
