const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const auth = require('../auth')

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/auth', auth, userController.auth)

router.get('/getusers', userController.getUsers)

module.exports = router
