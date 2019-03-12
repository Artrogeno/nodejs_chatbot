import Joi from 'joi'
import { MESSAGES } from './../messages'

export const SHOW_PARAMS_VALIDATION = {
  params: {
    id: Joi.string().required()
  }
}

export const STORE_BODY_VALIDATION = {
  body: {
    channel: Joi.string().min(2).max(30).required(),
    token: Joi.string().required(),
    botName: Joi.string(),
    botChannel: Joi.string(),
    botUrlApi: Joi.string()
  }
}

export const UPDATE_BODY_VALIDATION = {
  params: {
    id: Joi.string().required()
  },
  body: {
    channel: Joi.string().min(2).max(30).required(),
    token: Joi.string().required(),
    botName: Joi.string(),
    botChannel: Joi.string(),
    botUrlApi: Joi.string()
  }
}

export const DESTROY_PARAMS_VALIDATION = {
  params: {
    id: Joi.string().required()
  }
}
