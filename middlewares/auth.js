import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'
const { verify } = jwt

export const auth = (req, res, next) => {
  // check if there an authorization code in header
  const authCode = req.headers.authorization

  if (!authCode) {
    return res.json({
      authStatus: false,
      message: 'You did not send any auth code'
    })
  }

  verify(authCode, JWT_SECRET, (error, decode) => {
    if (error) {
      return res.json({
        authStatus: false,
        message: 'Your token is not valid'
      })
    }
    next()
  })
}
