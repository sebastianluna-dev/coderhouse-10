import mongoose from 'mongoose'
import { messageSchema, messageCollection } from '../models/Message.js'

class MessageService {
  constructor (name, schema) {
    this.model = mongoose.model(name, schema)
  }

  async createMessage (message, author) {
    const response = await this.model.create({ author, message })
    return response
  }

  async getAllMessages () {
    const response = await this.model.find()
    return response
  }
}

const messageDAO = new MessageService(messageCollection, messageSchema)

export { messageDAO }
