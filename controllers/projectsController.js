const { Project } = require('../models')

class ProjectsController {
  async getAll(req, res, next) {
    if (req.method === 'OPTIONS') return next(res.status(200))

    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`projects.getAll: ${message}`))
    }
  }
}

module.exports = new ProjectsController()
