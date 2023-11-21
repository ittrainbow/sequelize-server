const uuid = require('uuid')
const path = require('path')
const { Ticket } = require('../models')
const ErrorApi = require('../error')

class TicketsController {
  async create(req, res, next) {
    try {
      let {
        id,
        created,
        creator,
        description,
        issue,
        number,
        problem,
        projectid,
        severity,
        solution,
        status,
        touched,
        toucher
      } = req.body
      const ticket = await Ticket.create({
        id,
        created,
        creator,
        description,
        issue,
        number,
        problem,
        projectid,
        severity,
        solution,
        status,
        touched,
        toucher
      })

      if (info) {
        info = JSON.parse(info)
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        )
      }

      return res.json(ticket)
    } catch (e) {
      next(ErrorApi.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const { id } = req.params
    const tickets = await Ticket.findAll({
      where: { projectid: id }
    })
    return res.json(tickets)
  }

  async getOne(req, res) {
    const { id } = req.params
    const ticket = await Ticket.findOne({
      where: { id }
    })
    return res.json(ticket)
  }
}

module.exports = new TicketsController()
