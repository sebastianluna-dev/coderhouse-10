import express from 'express'
import { normalize, schema } from 'normalizr'
import { messageDAO } from '../services/messages.service.js'
import { userDAO } from '../services/users.service.js'
import { auth } from '../middlewares/auth.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

const { verify } = jwt

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const message = req.body.message
  const authToken = req.headers.authorization
  verify(authToken, JWT_SECRET, async (error, decode) => {
    if (error) {
      return res.json({
        status: false,
        message: 'auth error'
      })
    }
    const { username } = decode
    const user = await userDAO.getUserByName(username)
    if (!user) {
      return res.json({
        status: false,
        message: 'This user does not exist'
      })
    }
    const newMessage = await messageDAO.createMessage(message, user)
    res.json(newMessage)
  })
})

router.get('/', auth, async (req, res) => {
  const messages = await messageDAO.getAllMessages()
  res.json(messages)
})

router.get('/normalized', async (req, res) => {
  const messages = await messageDAO.getAllMessages()
  if (!Array.isArray(messages)) {
    return res.json({
      status: false,
      messages: 'There is not any message saved'
    })
  }
  if (messages.length === 0) {
    return res.json({
      status: false,
      messages: 'There is not any message saved'
    })
  }
  const schemaUser = new schema.Entity('users', {}, { idAttribute: '_id' })
  const schemaMessage = new schema.Entity('messages', { author: schemaUser }, { idAttribute: '_id' })
  const schemaArrayMessages = new schema.Array(schemaMessage)
  const normalizedData = normalize(messages, schemaArrayMessages)
  res.json(normalizedData.entities)
})

export { router as routerMessages }
