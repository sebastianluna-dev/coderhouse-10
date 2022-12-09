import session from 'express-session'
import MongoStore from 'connect-mongo'
import { DB_USERNAME, DB_PASSWORD } from './config.js'

export const expressSession = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m7cmfu5.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 10000,
    collectionName: 'sessions'
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false
})
