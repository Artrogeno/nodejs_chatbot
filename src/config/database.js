import mongoose from 'mongoose'
import { env } from 'process'

import { logger } from './../utils/logger'

export class Connection{
  constructor() {
    this.connection
    this.host = env.DB_HOST || 'localhost'
    this.port = env.DB_PORT || '27017'
    this.name = env.DB_NAME || 'test'
    this.authSrc = env.DB_AUTH_SRC || 'admin'
    this.logger = logger
  }

  getUrlConnection() {
    let authUrl = (env.DB_AUTH && Number(env.DB_AUTH) === 1) ? `${env.DB_USER}:${env.DB_PASS}@` : ''
    return `mongodb://${authUrl}${this.host}:${this.port}/${this.name}?authSource=${this.authSrc}`
  }

  getDisconnect(event) {
    mongoose.connection.close(() => {
      event()
    })
  }

  getDatabase(dbName) {
    return this.connection.useDb(dbName)
  }

  async connect() {
    try {
      const urlConnect = this.getUrlConnection()
      process.on('SIGINT', () => {
        this.getDisconnect( () => process.exit(0))
      })
      const mongoConn = await mongoose.connect(urlConnect, {auto_reconnect: true})
      this.connection = mongoConn.connection
    } catch (error) {
      this.logger.error('error connecting database MongoDB:', error)
    }
  }

  disconnect() {
    return mongoose.disconnect()
  }
}
