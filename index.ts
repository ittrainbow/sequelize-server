import express, { Request, Response } from 'express'

const app = express()
const cors = require('cors')

require('dotenv').config()

const { DB_PORT } = process.env

const sequelize = require('./db')

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(DB_PORT, () => console.log(`Server started on port ${DB_PORT}`))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

start()

const models = require('./models')
const router = require('./routes')
app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'app is up!' }))
app.use('/api', router)
