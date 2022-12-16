import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  res.clearCookie('jwt')
})

export { router as routerLogout }
