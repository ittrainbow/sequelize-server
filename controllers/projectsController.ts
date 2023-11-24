import { Request, Response, NextFunction } from 'express'
import { AppError } from '../types'

const { Project } = require('../models')

class ProjectsController {
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }
}

module.exports = new ProjectsController()
