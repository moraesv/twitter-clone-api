import passport, { PassportStatic } from 'passport'
import bcrypt from 'bcryptjs'

import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { setUser } from './auth'
import jwt from '../config/jwtConfig'

import UserModel from '../containers/User/UserModel'

import UserRepository from '../containers/User/UserRepository'

export default class Passport {
  private passport: PassportStatic

  private userRepository: UserRepository

  private jwtConfig: typeof jwt

  constructor(userRepository: UserRepository, jwtConfig: typeof jwt) {
    this.passport = passport
    this.userRepository = userRepository
    this.jwtConfig = jwtConfig

    this.init()
  }

  public init() {
    this.passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (
          email: string,
          password: string,
          done: (error: Error, user?: UserModel, options?: IVerifyOptions) => void,
        ) => {
          const user = await this.userRepository.findOne({
            where: {
              email,
            },
          })

          if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return done(null, null)
          }

          setUser(user)
          return done(null, user)
        },
      ),
    )

    this.passport.use(
      new JwtStrategy(
        {
          algorithms: [this.jwtConfig.algorithm],
          secretOrKey: this.jwtConfig.secret,
          jwtFromRequest: (req: any) => {
            const { access_token: token } = req.cookies()

            if (!token) {
              return null
            }

            return String(token).substring(7)
          },
        },
        async (payload, done) => {
          const { data } = payload

          if (!data) {
            return done(null, false)
          }

          const user = await this.userRepository.findOne({
            where: {
              id: data.id,
            },
          })

          if (!user) {
            return done(null, false)
          }

          setUser(user)
          return done(null, user)
        },
      ),
    )

    this.passport.use(new AnonymousStrategy())

    this.passport.serializeUser((user: UserModel, done) => {
      done(null, user.id)
    })

    return this.passport
  }
}
