const { Project, Ticket } = require('../models')

class DataController {
  async createProject(req, res) {
    const { name, description } = req.body
    const project = await Project.create({ name, description })
    return res.json(project)
  }

  async getAllProjects(_, res, next) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }

  async createTicket(req, res, next) {
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
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticket = req.body
      const { id } = ticket

      await Ticket.update(ticket, { where: { id } })
      return res.json(ticket)
    } catch (error) {
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const id = Number(req.body.id)
      await Ticket.destroy({ where: { id } })
      return res.json(id)
    } catch (error) {
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const { id } = req.params
      const tickets = await Ticket.findAll({
        where: { projectid: id }
      })
      return res.json(tickets)
    } catch (error) {
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }

  async getLastTicket(_, res, next) {
    try {
      const tickets = await Ticket.findAll()
      const lastId = Object.keys(tickets)
        .map((el) => tickets[el])
        .sort((a, b) => (b.id > a.id ? 1 : b.id < a.id ? -1 : 0))[0].id
      return res.json(lastId)
    } catch (error) {
      const { status, message } = error
      return next(res.status(status).json(message))
    }
  }
}

module.exports = new DataController()
