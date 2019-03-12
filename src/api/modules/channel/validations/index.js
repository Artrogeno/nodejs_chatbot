import validator from 'express-validation'
import {
  SHOW_PARAMS_VALIDATION, STORE_BODY_VALIDATION,
  UPDATE_BODY_VALIDATION, DESTROY_PARAMS_VALIDATION
} from './schemas/'

class ChannelValidations {
  async validShow(req, res, next) {
    await validator(SHOW_PARAMS_VALIDATION)(req, res, next)
  }

  async validStore(req, res, next) {
    await validator(STORE_BODY_VALIDATION)(req, res, next)
  }

  async validUpdate(req, res, next) {
    await validator(UPDATE_BODY_VALIDATION)(req, res, next)
  }

  async validDestroy(req, res, next) {
    await validator(DESTROY_PARAMS_VALIDATION)(req, res, next)
  }
}

export default new ChannelValidations()
