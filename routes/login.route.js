import express from 'express'
import { userDAO } from '../services/users.service.js'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { JWT_SECRET } from '../config.js'

const router = express.Router()
const { sign } = jwt

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await userDAO.getUserByName(username)

  if (!user) {
    return res.json({
      authStatus: false,
      message: 'The user or password are incorrect'
    })
  }
  const isCorrectPasword = await compare(password, user.password)

  if (isCorrectPasword) {
    const accessToken = sign({
      username: user.username
    }, JWT_SECRET)

    return res.json({
      authStatus: true,
      accessToken
    })
  }

  res.json({
    authStatus: false,
    message: 'The user or password are incorrect'
  })
})

export { router as routerLogin }
