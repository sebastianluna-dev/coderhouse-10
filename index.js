import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { expressSession } from './session.js'
import { connectDB } from './database/db.js'

import {
  routerRegister,
  routerLogin,
  routerLogout,
  routerSession,
  routerProducts,
  routerMessages
} from './routes/index.js'

import { PORT } from './config.js'

connectDB()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(expressSession)
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.sendFile('index.html')
)

app.use('/test/products', routerProducts)
app.use('/api/messages', routerMessages)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/register', routerRegister)
app.use('/session', routerSession)

httpServer.listen(PORT, () => console.log('SERVER RUNNING ON PORT ' + PORT))
