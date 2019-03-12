import { BaseRouter } from './../../../utils/base'
import { UserController } from './controllers/user'
import validations from './validations'

export class UserRouter extends BaseRouter {
	constructor() {
		super(UserController)
		this.router.get('/', this.handler(UserController.prototype.index))
		this.router.post('/', validations.validStore, this.handler(UserController.prototype.store))
		this.router.get('/:id/show', this.handler(UserController.prototype.show)) // validations.validShow
		this.router.put('/:id', validations.validUpdate, this.handler(UserController.prototype.update))
		this.router.delete('/:id', validations.validDestroy, this.handler(UserController.prototype.destroy))
	}
}
