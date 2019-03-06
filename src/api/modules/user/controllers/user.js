import { BaseController } from '../../../../utils/base'
import { User } from '../../../models'

export class UserController extends BaseController {

  constructor(req, res, next) {
    super(req, res, next)
    this.User = User
  }

  async get() {
    try {
      let user = await User.find({})
      this.res.status(200).json({success: true, data: user})
    } catch (error) {
      return this.res.status(401).json({ message: 'User not found!' })
    }
  }

  async store() {
    const { nickname, email, password } = this.req.body
    const findUser = await User.findOne({ where: { email } }).lean()
    if (!findUser) {
      const user = await User.create({ nickname, email, password })
      this.res.json({ user, token: user.generateToken() })
    } else {
      return this.res.status(401).json({ message: 'User found!' })
    }
  }
}
