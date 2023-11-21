const { Project, Task } = require('../models')
const ErrorApi = require('../error')

class ProjectsController {
  async create(req, res) {
    const { name, description } = req.body
    const project = await Project.create({ name, description })
    return res.json(project)
  }

  async getAll(_, res) {
    const projects = await Project.findAll()
    return res.json(projects)
  }

  async getOne(req, res) {
    const { id } = req.params
    const projects = await Project.findOne({
      where: { id }
    })
    return res.json(projects)
  }

  async getTickets(req, res) {
    const { id } = req.params
    const tickets = await Task.findAll({
      where: { id }
    })
    return res.json(tickets)
  }
}

module.exports = new ProjectsController()
