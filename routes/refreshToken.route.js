import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config.js'

const router = express.Router()
const { verify, sign } = jwt

router.post('/', (req, res) => {
  const refreshToken = req.cookies.jwt
  if (!refreshToken) {
    return res.json({
      refreshStatus: false,
      message: 'You do not have a refresh token, please login'
    })
  }
  verify(refreshToken, JWT_REFRESH_SECRET, (error, decode) => {
    if (error) {
      return res.json({
        refreshStatus: false,
        message: 'Your session has expired, please login again'
      })
    }

    const { username } = decode

    const newAccessToken = sign({
      username
    }, JWT_SECRET, {
      expiresIn: '1m'
    })

    const newRefreshToken = sign({
      username
    }, JWT_REFRESH_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24
    })

    res.json({
      refreshStatus: true,
      token: newAccessToken
    })
  })
})

export { router as routerRefreshToken }
