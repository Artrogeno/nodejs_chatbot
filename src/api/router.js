import { Router } from 'express'

import PassportMiddleware from '../utils/middleware/passport'
import { UserRouter } from './modules/user'
import { ChannelRouter } from './modules/channel'
import { AuthRouter } from './modules/auth'

export class ApiRouter {
	constructor() {
		this.router = Router()
		this.authenticate = PassportMiddleware.authenticate
		this.providerRoutes()
	}

	providerRoutes() {
		this.router.use('/auth', new AuthRouter().router)
		this.router.use('/user', this.authenticate, new UserRouter().router)
		this.router.use('/channel', this.authenticate, new ChannelRouter().router)
	}
}
