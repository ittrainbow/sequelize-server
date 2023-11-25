const express = require('express')

const usersController = require('../controllers/usersController')

const router = express.Router()

router.post('/signup', usersController.signup)

router.post('/login', usersController.login)

router.get('/auth', usersController.auth)

router.get('/getall', usersController.getAll)

router.post('/update', usersController.update)

module.exports = router
