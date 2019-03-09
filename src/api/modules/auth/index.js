import { BaseRouter } from './../../../utils/base'
import { AuthController } from './controllers/auth'

export class AuthRouter extends BaseRouter {
	constructor() {
		super(AuthController)
    this.router.post('/signup', this.handler(AuthController.prototype.signUp))
    this.router.post('/signin', this.handler(AuthController.prototype.signIn))
	}
}
