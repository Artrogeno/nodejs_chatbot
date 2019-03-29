import { Router } from 'express'
import { ApiRouter } from './../api/router'

export class ConfigRouter {
	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	providerRoutes() {
		this.router.get('/health', (req, res, next) => {
			res.status(200).json({server: 'server it\'s works!'})
		})
		this.router.use('/api', new ApiRouter().router)
	}
}
