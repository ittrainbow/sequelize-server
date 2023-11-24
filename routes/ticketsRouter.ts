import express, { Router } from 'express'

const ticketsController = require('../controllers/ticketsController')

const router: Router = express.Router()

router.get('/:id', ticketsController.getAll)

router.put('/update', ticketsController.update)

router.post('/create', ticketsController.create)

router.post('/delete', ticketsController.delete)

module.exports = router
