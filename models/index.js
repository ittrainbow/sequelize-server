const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  creator: { type: DataTypes.STRING(28) },
  createdAt: { type: DataTypes.BIGINT, field: 'created' },
  updater: { type: DataTypes.STRING(28) },
  updatedAt: { type: DataTypes.BIGINT, field: 'updated' },
  projectid: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING(2000) },
  issue: { type: DataTypes.STRING(2000) },
  problem: { type: DataTypes.STRING(4) },
  severity: { type: DataTypes.STRING(4) },
  solution: { type: DataTypes.STRING(2000) },
  status: { type: DataTypes.STRING(20) }
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
