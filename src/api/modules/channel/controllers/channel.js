import { BaseController } from '../../../../utils/base'
import { Channel } from '../../../models'

export class ChannelController extends BaseController {

  constructor(req, res, next) {
    super(req, res, next)
    this.Channel = Channel
  }

  async index() {
    let messages, data
    try {
      data = await Channel.find({})
      messages = this.messages.CHANNEL_CREATED_SUCCESS
      this.sendResponse({data, messages})
    } catch (error) {
      messages = this.messages.UNAUTHORIZED_REQUEST
      this.sendError({messages})
    }
  }

  async show() {
    try {
      let { id } = this.req.params
      let data = await Channel.findById(id).lean()
      this.sendResponse({data})
    } catch (error) {
      this.sendError({messages: this.messages.UNAUTHORIZED_REQUEST})
    }
  }

  async store() {
    const { channel, token, botName, botChannel, botUrlApi } = this.req.body
    let params = this.clearParams({ channel, token, botName, botChannel, botUrlApi })
    const findChannel = await Channel.findOne({ where: { token } }).lean()
    if (!findChannel) {
      let data = await Channel.create(params)
      let messages = this.messages.CHANNEL_CREATED_SUCCESS
      this.sendResponse({data, messages})
    } else {
      this.sendError({messages: this.messages.CHANNEL_CREATING_ERROR})
    }
  }

  async update() {
    const { id } = this.req.params
    const { channel, token, botName, botChannel, botUrlApi } = this.req.body
    let params = this.clearParams({ channel, token, botName, botChannel, botUrlApi })
    try {
      await Channel.findOneAndUpdate({_id: id}, params).lean()
      let messages = this.messages.CHANNEL_UPDATED_SUCCESS
      this.sendResponse({messages})
    } catch (error) {
      this.sendError({messages: this.messages.CHANNEL_UPDATING_ERROR})
    }
  }

  async destroy() {
    const { id } = this.req.params
    let messages
    try {
      await Channel.deleteOne({_id: id})
      messages = this.messages.CHANNEL_DELETED_SUCCESS
      this.sendResponse({messages})
    } catch (error) {
      this.sendError({messages: this.messages.CHANNEL_DELETED_ERROR})
    }
  }
}
