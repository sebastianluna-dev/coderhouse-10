import express from 'express'
import { userDAO } from '../services/users.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const user = req.body

  if (
    !user.username ||
    !user.password ||
    !user.email ||
    !user.image
  ) {
    res.json({
      error: 'Send all the parameters to register an user'
    })
    return
  }

  const searchUserByName = await userDAO.getUserByName(user.username)

  if (searchUserByName) {
    res.json({
      error: 'That username already exists'
    })
    return
  }

  const newUser = await userDAO.createUser(user)
  res.json(newUser)
})

export { router as routerRegister }
