import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import router from './../constants/public.router'
import messages from './../constants/http.response'
import Sanitize from './../helpers/sanitize'

export class JwtMiddleware {
  async authenticate(req, res, next) {
    const { originalUrl, headers: { authorization } } = req
    let token
    try {
      if (!Sanitize.inArrayUrl(router.PUBLIC, originalUrl)) {
        token = Sanitize.getTokenFromHeader(authorization)
        const jwtVerifyAsync = promisify(jwt.verify, { context: jwt })
        req.token = await jwtVerifyAsync(token, process.env.JWT_SECREAT)
        next()
      }
      next()
    } catch (err) {
      res.status(400).json({ messages: messages.TOKEN_EXPIRED })
      next()
    }
  }
}
