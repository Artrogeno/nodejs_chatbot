import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { env } from 'process'
import { User } from '../../api/models'
import { BaseController } from '../base'

export class PassportMiddleware extends BaseController {
  constructor() {
    super()
    this.User = User
  }

  initialize() {
    let options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECREAT
    }
    passport.use(new Strategy(options, (payload, done) => {
      this.User.findOne({ìd: payload.id}, (error, user) => {
        if (error) { return done(error, false) }
        user ? done(null, user) : done(null, false)
      })
    }))
    return passport.initialize()
  }

  authenticate(req, res, next) {
    passport.authenticate('Bearer', {session: false}, (error, user, info) => {
      if (error) { return next(error) }
      if (!user) {
        if (info.name === 'TokenExpiredError') {
          return this.sendError({messages: this.messages.TOKEN_EXPIRED})
        } else {
          return this.sendError({messages: this.messages.TOKEN_INVALID})
        }
      }
      req.user = user
      return next()
    })(req, res, next)
  }
}
