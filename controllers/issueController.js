const uuid = require('uuid')
const path = require('path')
const { Task } = require('../models')
const ErrorApi = require('../error')

class IssueController {
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
      const task = await Task.create({
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

      return res.json(task)
    } catch (e) {
      next(ErrorApi.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const { id } = req.params
    const issues = await Task.findAll({
      where: { projectid: id }
    })
    return res.json(issues)
  }

  async getOne(req, res) {
    const { id } = req.params
    const task = await Task.findOne({
      where: { id }
    })
    return res.json(task)
  }
}

module.exports = new IssueController()
