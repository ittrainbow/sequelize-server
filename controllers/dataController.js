const { Project, Ticket } = require('../models')
const ErrorApi = require('../error')

class DataController {
  async createProject(req, res) {
    const { name, description } = req.body
    const project = await Project.create({ name, description })
    return res.json(project)
  }

  async getAllProjects(_, res) {
    try {
      const projects = await Project.findAll()
      return res.json(projects)
    } catch (error) {
      next(ErrorApi.badRequest(error.message))
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
      next(ErrorApi.badRequest(error.message))
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticket = req.body
      const { id } = ticket

      await Ticket.update(ticket, { where: { id } })
      return res.json('success')
    } catch (error) {
      next(ErrorApi.badRequest(error.message))
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const id = Number(req.body.id)
      await Ticket.destroy({ where: { id } })
      return res.json(req.body)
    } catch (error) {
      next(ErrorApi.badRequest(error.message))
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
      next(ErrorApi.badRequest(error.message))
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
      next(ErrorApi.badRequest(error.message))
    }
  }
}

module.exports = new DataController()
