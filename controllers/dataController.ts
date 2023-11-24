import { AppError } from '../types'

const { Project, Ticket } = require('../models')

class DataController {
  async createProject(req: any, res: any, _: any) {
    const { name, description } = req.body
    const project = await Project.create({ name, description })
    return res.json(project)
  }

  // working
  async getAllProjects(_: any, res: any, next: any) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  async createTicket(req: any, res: any, next: any) {
    try {
      let { creator, description, issue, problem, projectid, severity, solution, status } = req.body
      const ticketData = { description, issue, problem, projectid, severity, solution, status }
      const ticketUser = {
        created: new Date().getTime(),
        touched: new Date().getTime(),
        creator,
        toucher: creator
      }
      const ticket = await Ticket.create({ ...ticketData, ...ticketUser })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  async updateTicket(req: any, res: any, next: any) {
    try {
      const { id } = req.body
      const createdAt = req.body.created.toString()
      const updatedAt = req.body.updated.toString()
      console.log(20, createdAt, updatedAt)
      // console.log(19, ticket)
      // console.log(20, findTicket.dataValues)

      const ticket = { ...req.body, createdAt, updatedAt }
      delete ticket.created
      delete ticket.updated

      console.log(21, ticket)

      await Ticket.update(ticket, { where: { id } })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  async deleteTicket(req: any, res: any, next: any) {
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
  async getAllTickets(req: any, res: any, next: any) {
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

  async getLastTicket(_: any, res: any, next: any) {
    try {
      const tickets = await Ticket.findAll()
      const lastId = Object.keys(tickets)
        .map((el) => tickets[el])
        .sort((a, b) => (b.id > a.id ? 1 : b.id < a.id ? -1 : 0))[0].id
      return res.json(lastId)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }
}

module.exports = new DataController()
