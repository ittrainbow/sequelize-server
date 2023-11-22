const Router = require('express')
const router = new Router()
const DataController = require('../controllers/dataController')

router.get('/', DataController.getAllProjects)

router.post('/createproject', DataController.createProject)

router.get('/:id', DataController.getAllTickets)

router.get('/tickets/getlast', DataController.getLastTicket)

router.put('/updateticket', DataController.updateTicket)

router.post('/createticket', DataController.createTicket)

router.post('/deleteticket', DataController.deleteTicket)

module.exports = router
