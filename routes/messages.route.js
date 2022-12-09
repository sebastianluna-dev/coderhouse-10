import express from 'express'
import { normalize, schema } from 'normalizr'
import { messageDAO } from '../services/messages.service.js'
import { userDAO } from '../services/users.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const message = req.body.message
  const userId = req.session.userId
  const userById = await userDAO.getUserById(userId)

  if (!userById) {
    res.send({
      status: false,
      message: 'you must be logged to send a message'
    })
    return
  }

  const newMessage = await messageDAO.createMessage(message, userById)
  res.send(newMessage)
})

router.get('/', async (req, res) => {
  const messages = await messageDAO.getAllMessages()
  res.send(messages)
})

router.get('/normalized', async (req, res) => {
  const messages = await messageDAO.getAllMessages()
  if (!Array.isArray(messages)) {
    res.send({ status: false, messages: 'There is not any message saved' })
    return
  }
  if (messages.length === 0) {
    res.send({ status: false, messages: 'There is not any message saved' })
    return
  }
  const schemaUser = new schema.Entity('users', {}, { idAttribute: '_id' })
  const schemaMessage = new schema.Entity('messages', { author: schemaUser }, { idAttribute: '_id' })
  const schemaArrayMessages = new schema.Array(schemaMessage)
  const normalizedData = normalize(messages, schemaArrayMessages)
  res.send(normalizedData.entities)
})

export { router as routerMessages }
