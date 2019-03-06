import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import bodyParserJsonError from 'express-body-parser-json-error'
import http from 'http'
import cors from 'cors'
import methodOverride from 'method-override'
import { Connection } from './database';

import { ConfigRouter } from './router'

export class Server extends  Connection{
  // static async connectDB() {
  //   return new Connection()
  // }

  constructor() {
		super()
    this.router = new ConfigRouter().router
    this.express = express()
		this.server = http.createServer(this.express)
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
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
			next();
		})
		this.express.use(morgan('combined'))
		this.express.use(cors())
		this.express.use((error, req, res, next) => {
			error.status = 404
			next(error)
		})
	}

	routerConfig() {
    this.express.use(this.router)
    this.express.get('/test', (req, res, next) => {
			res.status(200).json({test: 'server it\'s works!  <br/><br/> :)'});
    });
		this.express.use((req, res, next) => {
			res.status(404)
			res.json({ error: 'Not found' })
			next()
		})
		this.express.use((error, req, res, next) => {
			if (error.name === 'UnauthorizedError') {
				res.status(401).json({ error: 'Please send a valid token...' })
			}
			next()
		})
		this.express.use((error, req, res, next) => {
			res.status(error.status || 500)
			res.json({ error: error.message })
			next()
		})
	}
}
