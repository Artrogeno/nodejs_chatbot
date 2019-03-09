import { model, Schema } from 'mongoose'

let channelSchema = Schema({
  channel: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  botName: {
    type: String,
    default: ''
  },
  botChannel: {
    type: String,
    required: false,
  },
  botUrlApi: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export default model('Channel', channelSchema)
