import express from 'express'
import { userDAO } from '../services/users.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const userData = req.body
  const userId = req.session.userIds
  const userById = await userDAO.getUserById(userId)
  const searchUserByName = await userDAO.getUserByName(userData.username)

  if (userById) {
    res.send({
      message: 'Yo are alresady logged',
      status: true
    })
    return
  }

  if (searchUserByName) {
    const realPassword = searchUserByName.password
    const typedPasword = userData.password
    const typedUsername = userData.username
    if (realPassword === typedPasword) {
      const objectId = searchUserByName._id
      const id = objectId.toString()
      req.session.userId = id
      res.send({
        status: true,
        message: `welcome ${typedUsername}`
      })
    }
    return
  }

  res.send({
    status: false,
    message: 'The username that you have typed doesnt exist'
  })
})

export { router as routerLogin }
