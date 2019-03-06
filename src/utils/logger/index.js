import winston from 'winston'
import { env } from 'process'

class Logger {
  constructor() {
    this.logLevel = env.LOG_LEVEL || 'debug'
    this.logEnabled = env.LOG_ENABLED || 'true'
    this.format = winston.format;
    this.setLogger()
  }

  setLogger() {
    if (this.logEnabled === 'true') {
      // this.addLogger(env.NODE_ENV)
      this.addLogger()
    }
  }

  addLogger() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      level: this.logLevel,
      prettyPrint: true,
      format: this.format.combine(
        this.format.colorize(),
        this.format.json()
      )
    })
  }
}

export const logger = new Logger().logger
