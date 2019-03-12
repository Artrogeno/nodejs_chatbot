import { BaseRouter } from './../../../utils/base'
import { ChannelController } from './controllers/channel'
import validations from './validations'

export class ChannelRouter extends BaseRouter {
	constructor() {
		super(ChannelController)
		this.router.get('/', this.handler(ChannelController.prototype.index))
		this.router.post('/', validations.validStore, this.handler(ChannelController.prototype.store))
		this.router.get('/:id/show',  validations.validShow, this.handler(ChannelController.prototype.show))
		this.router.put('/:id', validations.validUpdate, this.handler(ChannelController.prototype.update))
		this.router.delete('/:id', validations.validDestroy, this.handler(ChannelController.prototype.destroy))
	}
}
