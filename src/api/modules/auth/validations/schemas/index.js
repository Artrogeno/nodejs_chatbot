import Joi from 'joi'
import { MESSAGES } from './../messages'

export const SINGUP_BODY_VALIDATION = {
  body: {
    nickname: Joi.string().required().options(MESSAGES),
    email: Joi.string().email().required().options(MESSAGES),
    password: Joi.string().min(6).max(10).required()
  }
}

export const SINGIN_BODY_VALIDATION = {
  body: Joi.object().keys({
    nickname: Joi.string().options(MESSAGES),
    email: Joi.string().email().options(MESSAGES),
    password: Joi.string().min(6).max(10).required()
  }).or('nickname', 'email')
}
