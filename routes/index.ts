import express, { Router } from 'express'
const userRouter = require('./userRouter')
const dataRouter = require('./dataRouter')

const router = express.Router()

router.use('/user', userRouter)
router.use('/projects', dataRouter)

module.exports = router
