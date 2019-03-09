import { sign } from 'jsonwebtoken'
import { BaseController } from '../../../../utils/base'
import { User, Role } from '../../../models'
import { env } from 'process'

export class AuthController extends BaseController {
  constructor(req, res, next) {
    super(req, res, next)
    this.User = User
    this.Role = Role
    this.Sign = sign
  }

  async signUp() {
    const { nickname, email, password } = this.req.body
    const newUser = new this.User({nickname, email, password})
    newUser.save(error => {
      if (error) return this.sendError({messages: this.messages.USER_CREATING_ERROR})
      this.sendResponse({messages: this.messages.USER_CREATED_SUCCESS})
    })
  }

  async signIn() {
    const { nickname, email, password } = this.req.body
    let params = this.clearParams({ nickname, email })
    await User.findOne(params, (error, user) => {
      if (error) return this.sendError({messages: this.messages.UNAUTHORIZED_REQUEST})
      if (!user) return this.sendError({messages: this.messages.AUTHENTICATION_FAILED})
      user.comparePassword(password, (error, isMatch) => {
        if (isMatch && !error) {
          let {roles, isActive, _id, nickname, email } = user.toJSON()
          const token = this.Sign({roles, isActive, _id, nickname, email}, env.JWT_SECREAT,{ expiresIn: env.JWT_EXPIRES || '30m' })
          this.sendResponse({messages: this.messages.USER_CREATED_SUCCESS, token})
        } else {
          this.sendError({messages: this.messages.AUTHENTICATION_FAILED_PASSWORD})
        }
      })
    })
  }
}
