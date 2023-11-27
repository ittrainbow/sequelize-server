const { Ticket } = require('../models')

class TicketsController {
  async create(req, res, next) {
    try {
      let { creator, description, issue, problem, projectid, severity, solution, status } = req.body
      const ticketData = { description, issue, problem, projectid, severity, solution, status }
      const ticketUser = {
        created: new Date().getTime(),
        updated: new Date().getTime(),
        creator,
        updater: creator
      }
      const last = await Ticket.findOne({
        order: [['id', 'DESC']]
      })
      const ticket = await Ticket.create({ ...ticketData, ...ticketUser, id: last.id + 1 })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`tickets.create: ${message}`))
    }
  }

  async update(req, res, next) {
    try {
      const ticket = req.body
      const { id } = ticket
      await Ticket.update(ticket, { where: { id } })
      return res.json(ticket)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`tickets.update: ${message}`))
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.body.id)
      await Ticket.destroy({ where: { id } })
      return res.json(id)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`tickets.delete: ${message}`))
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params
      const tickets = await Ticket.findAll({
        where: { projectid: id }
      })
      return res.json(tickets)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`tickets.getAll: ${message}`))
    }
  }
}

module.exports = new TicketsController()
