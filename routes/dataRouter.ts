import express, { Router } from 'express'
const DataController = require('../controllers/dataController')

const router: Router = express.Router()

router.get('/', DataController.getAllProjects)

router.post('/createproject', DataController.createProject)

router.get('/:id', DataController.getAllTickets)

router.get('/tickets/getlast', DataController.getLastTicket)

router.put('/updateticket', DataController.updateTicket)

router.post('/createticket', DataController.createTicket)

router.post('/deleteticket', DataController.deleteTicket)

module.exports = router
