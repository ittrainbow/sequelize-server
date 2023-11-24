import express, { Router } from 'express'

const projectsController = require('../controllers/projectsController')

const router: Router = express.Router()

router.get('/getall', projectsController.getAll)

module.exports = router
