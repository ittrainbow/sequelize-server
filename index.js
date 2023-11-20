const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5500

const sequelize = require('./db')

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.error(error.message)
  }
}

start()

const models = require('./models')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (_, res) => res.status(200).json({ message: 'app is up!' }))

const router = require('./routes/index')
app.use('/api', router)

// const fileUpload = require('express-fileupload')
// const path = require('path')

// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))

const errorHandler = require('./middleware/errorMiddleware')
app.use(errorHandler)
