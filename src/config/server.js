import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import bodyParserJsonError from 'express-body-parser-json-error'
import http from 'http'
import cors from 'cors'
import methodOverride from 'method-override'
import { Connection } from './database'
import { ConfigRouter } from './router'
import { HandlerMiddleware } from './../utils/middleware/handler'
import PassportMiddleware from '../utils/middleware/passport'

export class Server extends  Connection{
  constructor() {
		super()
    this.router = new ConfigRouter().router
		this.handler = new HandlerMiddleware()
    this.express = express()
		this.server = http.createServer(this.express)
		this.passport = PassportMiddleware.initialize
  }

  async start() {
		return await this.connect().then(() => {
			this.expressConfig()
			this.routerConfig()
			return this.server
		})
  }

  app() {
		return this.express
  }

  expressConfig() {
		this.express.use(morgan(':method :url :status :response-time'))
		this.express.use(bodyParser.urlencoded({ extended: true }))
		this.express.use(bodyParser.json({ limit: '20mb' }))
		this.express.use(bodyParserJsonError())
		this.express.use(methodOverride())
		this.express.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
			res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
			next()
		})
		this.express.use(morgan('combined'))
		this.express.use(cors())
	}

	routerConfig() {
		this.express.get('/health', (req, res, next) => {
			res.status(200).json({server: 'server it\'s works!'})
		})
		this.express.use(this.router)
		this.express.use('*', this.handler.routerHandler, this.handler.errorHandler)
		this.express.use(this.passport)
	}
}
