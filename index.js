import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import {
  routerRegister,
  routerLogin,
  routerLogout,
  routerProducts,
  routerMessages,
  routerRefreshToken
} from './routes/index.js'

import { connectDB } from './database/db.js'
import { PORT } from './config.js'

connectDB()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/refreshToken', routerRefreshToken)
app.use('/test/products', routerProducts)
app.use('/api/messages', routerMessages)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/register', routerRegister)

app.listen(PORT, () => console.log('SERVER RUNNING ON PORT ' + PORT))
