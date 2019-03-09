import { model, Schema } from 'mongoose'

let roleSchema = Schema({
    name: String
})

export default model('Role', roleSchema)
