// const ErrorApi = require('../error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
// const { query } = require('../db')

const createToken = ({ id, email, admin = false }) => {
  return jwt.sign({ id, email, admin }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async signup(req, res, next) {
    const { email, password, name } = req.body

    // if (!email || !password || !name) return next(ErrorApi.internal('Введите все необходимые данные'))
    if (!email || !password || !name) return res.status(406).json({ errorMessage: 'Not enough data' })

    const gotUser = await User.findOne({ where: { email } })
    // if (gotUser) return next(ErrorApi.internal('Email already in use'))
    if (gotUser) return res.status(401).json({ errorMessage: 'email already in use' })

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, name })
    const token = createToken(user)

    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    // if (!user) return next(ErrorApi.internal('User do not exists'))
    if (!user) return res.status(401).json({ errorMessage: 'User do not exists' })

    let pwdCheck = bcrypt.compareSync(password, user.password)
    if (!pwdCheck) return res.status(401).json('Wrong password')

    const token = createToken(user)
    return res.json({ token })
  }

  async getUsers(_, res, next) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (error) {
      const { message } = error
      next(res.json({ errorMessage: message }))
    }
  }

  async auth(req, res, next) {
    // console.log(203, req.body)
    // const { user } = req.body
    // const { id } = req.query
    // console.log(120, id)
    // const token = createToken(user)
    // if (!id) return next(ErrorApi.badRequest('No user ID'))
    // if (!id) return next(res.json({ errorMessage: 'No user ID' }))
    return res.json({ message: 'OK' })
  }
}

module.exports = new UserController()
