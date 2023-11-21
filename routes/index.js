const Router = require('express')
const userRouter = require('./userRouter')
const projectRouter = require('./projectsRouter')
const issueRouter = require('./issueRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/projects', projectRouter)
router.use('/projects/:id/issues', issueRouter)

module.exports = router
