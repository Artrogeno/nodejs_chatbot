import validator from 'express-validation'
import { SINGUP_BODY_VALIDATION, SINGIN_BODY_VALIDATION } from './schemas/'

class AuthValidations {
  async validSignUp(req, res, next) {
    await validator(SINGUP_BODY_VALIDATION)(req, res, next)
  }

  async validSignIn(req, res, next) {
    await validator(SINGIN_BODY_VALIDATION)(req, res, next)
  }
}

export const validations = new AuthValidations()
