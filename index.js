const express = require('express')

const app = express()
const cors = require('cors')

require('dotenv').config()

const { PORT } = process.env

const sequelize = require('./db')

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

start()

const models = require('./models')
const router = require('./routes')
app.use(cors())
app.use((req, res, next) => {
  req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  req.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  req.header('Access-Control-Allow-Origins', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Origins', '*')
  next()
})
app.use(express.json())
app.get('/', (req, res) => res.status(200).json({ message: 'app is up!' }))
app.use('/api', router)
