const { Project } = require('../models')
const ErrorApi = require('../error')

class ProjectController {
  async create(req, res) {
    const { id, name } = req.body
    const project = await Project.create({ name })
    return res.json(project)
  }

  async getAll(_, res) {
    const projects = await Project.findAll()
    return res.json(projects)
  }
}

module.exports = new ProjectController()
