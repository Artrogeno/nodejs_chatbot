import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from 'process'

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 8)
}

export const userSave = async function (next) {
  if (this.isNew) {
      this.password = await bcrypt.hash(this.password, 8)
      next()
  }
}

export const userUpdate = async function (next) {
  let self = this.getUpdate();
  if (self.password) {
    self.password = await bcrypt.hash(self.password, 8)
  }
  next()
}

export const comparePassword = (password) => {
  return bcrypt.compare(password, this.password)
}

export const generateToken = () => {
  return jwt.sign({id: this._id}, env.API_SECRET)
}
