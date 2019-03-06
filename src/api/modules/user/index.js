import { BaseRouter } from './../../../utils/base'
import { UserController } from './controllers/user'

export class UserRouter extends BaseRouter {
	constructor() {
		super(UserController)
		this.router.get('/', this.handler(UserController.prototype.get))
		this.router.post('/', this.handler(UserController.prototype.store))
	}
}
