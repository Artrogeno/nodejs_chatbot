import { Router } from 'express'

import { AuthRouter } from './modules/auth'
import { UserRouter } from './modules/user'
import { ChannelRouter } from './modules/channel'
import { TelegramRouter } from './modules/telegram'

export class ApiRouter {
	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	providerRoutes() {
		this.router.use('/auth', new AuthRouter().router)
		this.router.use('/user', new UserRouter().router)
		this.router.use('/channel', new ChannelRouter().router)
		this.router.use('/telegram', new TelegramRouter().router)
	}
}
