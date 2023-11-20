const Router = require('express')
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const issueRouter = require('./issueRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/project', issueRouter)

module.exports = router
