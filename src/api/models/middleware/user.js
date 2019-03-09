import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { env } from 'process'

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 8)
}

export const userSave = async function (next) {
  let user = this
  if (this.isNew) {
    await bcrypt.genSalt(10, (error, salt) => {
      if(error) return next(error)
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if(error) return next(error)
        user.password = hash;
        next();
      })
    })
  } else {
    return next();
  }
}

export const userUpdate = async function (next) {
  let self = this.getUpdate();
  if (self.password) {
    self.password = await bcrypt.hash(self.password, 10)
  }
  next()
}

export const comparePassword = async function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return callback(error, false)
    return callback(null, isMatch);
  })
}

export const generateToken = function () {
  return jwt.sign({id: this._id}, env.API_SECRET)
}
