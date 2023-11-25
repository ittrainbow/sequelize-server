import express from 'express'

const projectsController = require('../controllers/projectsController')

const router = express.Router()

router.get('/getall', projectsController.getAll)

module.exports = router
