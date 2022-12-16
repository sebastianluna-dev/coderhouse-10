import mongoose from 'mongoose'
import { userSchema, userCollection } from '../models/User.js'
import { hash } from 'bcrypt'

class UserService {
  constructor (name, schema) {
    this.model = mongoose.model(name, schema)
  }

  async createUser (user) {
    const password = await hash(user.password, 10)
    const userHashed = { ...user, password }
    const response = await this.model.create(userHashed)
    return response
  }

  async getUserById (id) {
    const response = await this.model.findById(id)
    return response
  }

  async getUserByName (username) {
    const response = await this.model.findOne({ username })
    return response
  }
}

const userDAO = new UserService(userCollection, userSchema)
export { userDAO }
