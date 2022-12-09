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
    res.send({
      error: 'Send all the parameters to register an user'
    })
    return
  }

  const searchUserByName = await userDAO.getUserByName(user.username)

  if (searchUserByName) {
    res.send({
      error: 'You already have an user with that name'
    })
    return
  }

  const newUser = await userDAO.createUser(user)
  req.session.userId = newUser._id.toString()
  res.send(newUser)
})

export { router as routerRegister }
