import { model, Schema } from 'mongoose'
// import { Role } from './role'
import { userSave, userUpdate, comparePassword, generateToken } from './middleware/user'

let userSchema = Schema({
  nickname: {
    type: String,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

userSchema.pre('save', userSave)

userSchema.pre('findOneAndUpdate', userUpdate)

userSchema.methods.comparePassword = comparePassword

userSchema.methods.generateToken = generateToken

userSchema.statics.list = (...params) => {
  try {
    let query = params.filter ? this.find(params.filter) : this.find()
    query.sort( params.sort || { createdAt: -1 } )
    if (params.skip) query.skip(skip)
    if (params.limit) query.limit(limit)
    if (params.select) query.select(select)
    return query.exec()
  } catch (err) {
    return Promise.reject(err);
  }
};

userSchema.statics.get = (id) => {
  try {
    return this.findById(id).exec();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default model('User', userSchema)
