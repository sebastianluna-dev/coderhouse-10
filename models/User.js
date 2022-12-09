import { Schema } from 'mongoose'

const userCollection = 'users'

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  image: String
}, {
  timestamps: true,
  versionKey: false
})

export { userCollection, userSchema }
