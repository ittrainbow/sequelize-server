const Router = require('express')
const userRouter = require('./userRouter')
const projectRouter = require('./projectsRouter')
const ticketsRouter = require('./ticketsRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/projects', projectRouter)
router.use('/projects/:id/tickets', ticketsRouter)

module.exports = router
