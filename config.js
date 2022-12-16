import dotenv from 'dotenv'
dotenv.config()

const {
  JWT_REFRESH_SECRET,
  JWT_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  PORT
} = process.env

export {
  DB_USERNAME,
  DB_PASSWORD,
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET
}
