import { Schema } from 'mongoose'
import { userSchema } from './User.js'

const messageCollection = 'messages'

const messageSchema = new Schema({
  author: userSchema,
  message: String
}, {
  timestamps: true,
  versionKey: false
})

export { messageCollection, messageSchema }
