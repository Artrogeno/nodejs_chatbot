import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { env } from 'process'
import { User } from '../../api/models'
import { BaseController } from '../base'

class PassportMiddleware extends BaseController {
  constructor() {
    super()
  }

  initialize() {
    let opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: env.JWT_SECREAT
    }
    passport.use(new Strategy(opts, (payload, done) => {
      User.findOne({_id: payload._id}, (error, user) => {
        if (error) { return done(error, false) }
        user ? done(null, user) : done(null, false)
      })
    }))
    return passport.initialize()
  }

  authenticate(req, res, next) {
    passport.authenticate('jwt', {session: false}, (error, user, info) => {
      if (error) { return next(error) }
      if (!user) {
        if (info && info.name === 'TokenExpiredError') {
          return next(new Error('TOKEN_EXPIRED'))
        } else {
          return next(new Error('TOKEN_INVALID'))
        }
      }
      req.user = user
      return next()
    })(req, res, next)
  }
}

export default new PassportMiddleware()
