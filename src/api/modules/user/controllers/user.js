import { BaseController } from '../../../../utils/base'
import { User } from '../../../models'

export class UserController extends BaseController {

  constructor(req, res, next) {
    super(req, res, next)
    this.User = User
  }

  async index() {
    let messages, data
    try {
      data = await User.find({})
      messages = this.messages.USER_CREATED_SUCCESS
      this.sendResponse({data, messages})
    } catch (error) {
      messages = this.messages.UNAUTHORIZED_REQUEST
      this.sendError({messages})
    }
  }

  async show() {
    try {
      let { id } = this.req.params
      let data = await User.findById(id).lean()
      this.sendResponse({data})
    } catch (error) {
      this.sendError({messages: this.messages.UNAUTHORIZED_REQUEST})
    }
  }

  async store() {
    const { nickname, email, password } = this.req.body
    let data, messages, token
    const findUser = await User.findOne({ where: { email } }).lean()
    if (!findUser) {
      data = await User.create({ nickname, email, password })
      messages = this.messages.USER_CREATED_SUCCESS
      token = data.generateToken()
      this.sendResponse({data, messages, token})
    } else {
      this.sendError({messages: this.messages.USER_CREATING_ERROR})
    }
  }

  async update() {
    const { id } = this.req.params
    const { nickname, email, password } = this.req.body
    let params = this.clearParams({nickname, email, password})
    try {
      await User.findOneAndUpdate({_id: id}, params).lean()
      let messages = this.messages.USER_UPDATED_SUCCESS
      this.sendResponse({messages})
    } catch (error) {
      this.sendError({messages: this.messages.USER_UPDATING_ERROR})
    }
  }

  async destroy() {
    const { id } = this.req.params
    let messages
    try {
      await User.deleteOne({_id: id})
      messages = this.messages.USER_DELETED_SUCCESS
      this.sendResponse({messages})
    } catch (error) {
      this.sendError({messages: this.messages.USER_DELETED_ERROR})
    }
  }
}
