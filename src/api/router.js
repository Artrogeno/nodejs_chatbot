import { Router } from 'express'

import { UserRouter } from './modules/user'

export class ApiRouter {
	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	providerRoutes() {
		this.router.use('/user', new UserRouter().router)
	}
}
