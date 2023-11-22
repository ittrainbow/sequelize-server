const Router = require('express')
const userRouter = require('./userRouter')
const dataRouter = require('./dataRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/projects', dataRouter)

module.exports = router
