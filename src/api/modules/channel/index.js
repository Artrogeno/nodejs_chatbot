import { BaseRouter } from './../../../utils/base'
import { ChannelController } from './controllers/channel'

export class ChannelRouter extends BaseRouter {
	constructor() {
		super(ChannelController)
		this.router.get('/', this.handler(ChannelController.prototype.index))
		this.router.post('/', this.handler(ChannelController.prototype.store))
		this.router.get('/:id/show', this.handler(ChannelController.prototype.show))
		this.router.put('/:id', this.handler(ChannelController.prototype.update))
		this.router.delete('/:id', this.handler(ChannelController.prototype.destroy))
	}
}
