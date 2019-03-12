import Joi from 'joi'
import { MESSAGES } from './../messages'

export const SHOW_PARAMS_VALIDATION = {
  params: {
    id: Joi.string().required()
  }
}

export const STORE_BODY_VALIDATION = {
  body: {
    nickname: Joi.string(),
    email: Joi.string().email().options(MESSAGES),
    password: Joi.string().min(6).max(10).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    isActive: Joi.boolean(),
    roles: Joi.string()
  }
}

export const UPDATE_BODY_VALIDATION = {
  body: {
    nickname: Joi.string(),
    email: Joi.string().email().options(MESSAGES),
    password: Joi.string().min(6).max(10),
    firstName: Joi.string(),
    lastName: Joi.string(),
    isActive: Joi.boolean(),
    roles: Joi.string()
  }
}

export const DESTROY_PARAMS_VALIDATION = {
  params: {
    id: Joi.string().required()
  }
}
