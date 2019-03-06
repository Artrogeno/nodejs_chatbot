import { Router } from 'express'
import { ApiRouter } from './../api/router'

export class ConfigRouter {
	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	providerRoutes() {
    this.router.use('/api', new ApiRouter().router)
    // this.router.get('/api/test', (req, res, next) => {
    //   res.send('Test endpoint api')
    //   next()
    // })
	}
}
