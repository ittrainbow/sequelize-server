const Router = require('express')
const router = new Router()
const projectsController = require('../controllers/projectsController')
const ticketsController = require('../controllers/ticketsController')

router.post('/', projectsController.create)

router.get('/', projectsController.getAll)

router.get('/:id', ticketsController.getAll)

module.exports = router
