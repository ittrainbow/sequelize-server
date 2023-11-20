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
  created: { type: DataTypes.INTEGER },
  creator: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  issue: { type: DataTypes.STRING },
  problem: { type: DataTypes.STRING },
  projectname: { type: DataTypes.STRING },
  severity: { type: DataTypes.STRING },
  solution: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  touched: { type: DataTypes.INTEGER },
  toucher: { type: DataTypes.STRING }
})

const Project = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
