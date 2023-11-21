const Router = require('express')
const router = new Router()
const ticketsController = require('../controllers/ticketsController')

router.post('/:id', ticketsController.create)

router.get('/', ticketsController.getAll)

router.get('/:id', ticketsController.getOne)

module.exports = router
