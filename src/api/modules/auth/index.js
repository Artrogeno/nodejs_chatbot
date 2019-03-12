import { BaseRouter } from './../../../utils/base'
import { AuthController } from './controllers/auth'
import validations from './validations'

export class AuthRouter extends BaseRouter {
	constructor() {
		super(AuthController)
		this.router.post('/signup', validations.validSignUp, this.handler(AuthController.prototype.signUp))
    this.router.post('/signin', validations.validSignIn, this.handler(AuthController.prototype.signIn))
	}
}
