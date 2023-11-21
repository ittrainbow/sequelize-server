const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

const Task = sequelize.define('issue', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  created: { type: DataTypes.BIGINT },
  createdAt: { type: DataTypes.DATE },
  creator: { type: DataTypes.STRING(50) },
  description: { type: DataTypes.STRING(2000) },
  issue: { type: DataTypes.STRING(2000) },
  problem: { type: DataTypes.STRING(20) },
  projectid: { type: DataTypes.INTEGER },
  number: { type: DataTypes.INTEGER },
  severity: { type: DataTypes.STRING(20) },
  solution: { type: DataTypes.STRING(2000) },
  status: { type: DataTypes.STRING(20) },
  touched: { type: DataTypes.BIGINT },
  toucher: { type: DataTypes.STRING(50) },
  updatedAt: { type: DataTypes.DATE }
})

const Project = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING }
})

Project.hasOne(Task)
Task.belongsTo(Project)

User.hasMany(Task)
Task.belongsTo(User)

module.exports = {
  User,
  Task,
  Project
}
