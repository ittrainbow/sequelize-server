const Router = require('express')
const router = new Router()
const projectsController = require('../controllers/projectsController')
const issueController = require('../controllers/issueController')

router.post('/', projectsController.create)

router.get('/', projectsController.getAll)

router.get('/:id', issueController.getAll)

module.exports = router
