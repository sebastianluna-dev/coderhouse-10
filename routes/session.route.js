import express from 'express'
import { userDAO } from '../services/users.service.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const userId = req.session.userId
  const user = await userDAO.getUserById(userId)
  if (user) {
    res.send({ status: true })
    return
  }
  res.send({ status: false })
})

export { router as routerSession }
