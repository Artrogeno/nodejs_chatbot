import { BaseRouter } from './../../../utils/base'
import { UserController } from './controllers/user'

export class UserRouter extends BaseRouter {
	constructor() {
		super(UserController)
		this.router.get('/', this.handler(UserController.prototype.index))
		this.router.post('/', this.handler(UserController.prototype.store))
		this.router.get('/:id/show', this.handler(UserController.prototype.show))
		this.router.put('/:id', this.handler(UserController.prototype.update))
		this.router.delete('/:id', this.handler(UserController.prototype.destroy))
	}
}
