const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.BIGINT, field: 'created', defaultValue: new Date().getTime() },
  updatedAt: { type: DataTypes.BIGINT, field: 'updated', defaultValue: new Date().getTime() }
})

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  creator: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.BIGINT, field: 'created' },
  updater: { type: DataTypes.STRING },
  updatedAt: { type: DataTypes.BIGINT, field: 'updated' },
  projectid: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING(2000) },
  issue: { type: DataTypes.STRING(2000) },
  problem: { type: DataTypes.STRING },
  severity: { type: DataTypes.STRING },
  solution: { type: DataTypes.STRING(2000) },
  status: { type: DataTypes.STRING }
})

const Project = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  projectid: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = {
  User,
  Ticket,
  Project
}
