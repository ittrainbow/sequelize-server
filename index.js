const express = require('express')

const app = express()
const cors = require('cors')

require('dotenv').config()

const { PORT } = process.env

const sequelize = require('./db')

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

// const io = new Server(server, {
//   cors: { origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Access-Control-Allow-Origin'] }
// })

start()

const models = require('./models')
const router = require('./routes')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.status(200).json({ message: 'app is up!' }))
app.use('/api', router)
