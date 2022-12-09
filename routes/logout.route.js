import express from 'express'
import { userDAO } from '../services/users.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { userId } = req.session
  const user = await userDAO.getUserById(userId)

  if (user) {
    req.session.destroy()
    res.send({
      message: `${user.username} has closed the session`,
      status: true
    })
    return
  }

  res.send({
    message: "there wasn't any session open",
    status: false
  })
})

export { router as routerLogout }
