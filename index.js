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

const corsOptions = {
  // origin: ['http://localhost:3000', 'http://192.168.1.99:3000'],
  // origin: true,
  allowedHeaders: ['Content-Type', 'Authorization, X-Requested-With'],
  methods: ['GET', 'POST', 'OPTIONS']
}

const models = require('./models')
const router = require('./routes')
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin: *')
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token')
  next()
})
app.use(express.json())
app.get('/', (req, res) => res.status(200).json({ message: 'app is up!' }))
app.use('/api', router)
