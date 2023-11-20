const Router = require('express')
const router = new Router()
const issueController = require('../controllers/issueController')

router.post('/:id', issueController.create)

router.get('/:id', issueController.getOne)

module.exports = router
