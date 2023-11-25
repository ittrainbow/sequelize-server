import express from 'express'

const usersRouter = require('./usersRouter')
const ticketsRouter = require('./ticketsRouter')
const projectsRouter = require('./projectsRouter')

const router = express.Router()

router.use('/users', usersRouter)
router.use('/tickets', ticketsRouter)
router.use('/projects', projectsRouter)

module.exports = router
