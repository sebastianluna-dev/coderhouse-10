import express from 'express'
import { userDAO } from '../services/users.service.js'
import { auth } from '../middlewares/auth.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

const { verify } = jwt

const router = express.Router()

router.get('/', auth, async (req, res) => {
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
    res.json(user)
  })
})

export { router as routerUser }
