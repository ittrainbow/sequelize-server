import express, { Router } from 'express'
const router: Router = express.Router()
const userController = require('../controllers/userController')

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/auth', userController.auth)

router.get('/getusers', userController.getUsers)

router.post('/update', userController.updateUser)

module.exports = router
