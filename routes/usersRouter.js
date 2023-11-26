const express = require('express')

const middleware = require('../middleware')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.post('/signup', middleware, usersController.signup)

router.post('/login', middleware, usersController.login)

router.get('/auth', middleware, usersController.auth)

router.get('/getall', middleware, usersController.getAll)

router.post('/update', middleware, usersController.update)

module.exports = router
