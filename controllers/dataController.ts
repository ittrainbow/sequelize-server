import { Request, Response, NextFunction } from 'express'
import { AppError } from '../types'

const { Project, Ticket } = require('../models')

class DataController {
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, projectid } = req.body
      const project = await Project.create({ name, description, projectid })
      return res.json(project)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async getAllProjects(_: Request, res: Response, next: NextFunction) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      let { creator, description, issue, problem, projectid, severity, solution, status } = req.body
      const ticketData = { description, issue, problem, projectid, severity, solution, status }
      const ticketUser = {
        created: new Date().getTime(),
        updated: new Date().getTime(),
        creator,
        updater: creator
      }
      const ticket = await Ticket.create({ ...ticketData, ...ticketUser })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async updateTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = req.body
      const { id } = ticket
      await Ticket.update(ticket, { where: { id } })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async deleteTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.body.id)
      await Ticket.destroy({ where: { id } })
      return res.json(id)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async getAllTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const tickets = await Ticket.findAll({
        where: { projectid: id }
      })
      return res.json(tickets)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }
}

module.exports = new DataController()
