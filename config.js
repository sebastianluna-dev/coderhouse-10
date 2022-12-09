import dotenv from 'dotenv'
dotenv.config()

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const PORT = process.env.PORT

export { DB_USERNAME, DB_PASSWORD, PORT }
