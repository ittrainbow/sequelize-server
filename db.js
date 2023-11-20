const { Sequelize } = require('sequelize')

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})
