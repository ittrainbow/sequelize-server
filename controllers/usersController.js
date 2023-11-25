const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('../models')

const createToken = ({ id, email, admin = false }) => {
  return jsonwebtoken.sign({ id, email, admin }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UsersController {
  async signup(req, res, next) {
    const { email, password, name } = req.body
    if (!email || !password || !name) return next(res.status(400).json('user.signup: Not enough data'))

    const gotUser = await User.findOne({ where: { email } })
    if (gotUser) return next(res.status(403).json('user.signup: Email already in use'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, name })
    const token = createToken(user)

    return res.json({ user, token })
  }

  async login(req, res, next) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return next(res.status(400).json('user.login: User does not exists'))

    let pwdCheck = bcrypt.compareSync(password, user.password)
    if (!pwdCheck) return next(res.status(403).json('user.login: Wrong password'))

    const token = createToken(user)
    return res.json({ user, token })
  }

  async auth(req, res, next) {
    const { authorization } = req.headers
    const headerToken = authorization && authorization.split(' ')[1]

    if (!headerToken) return next(res.status(401).json('user.auth: No token'))

    const findUser = async (id) => {
      await User.findOne({ where: { id } })
        .then((response) => response.dataValues)
        .then((user) => {
          delete user.password
          const token = createToken(user)
          return res.json({ user, token })
        })
        .catch(() => next(res.status(401).json('user.auth: User not authorized (token probably expired)')))
    }

    jsonwebtoken.verify(headerToken, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        const { status = 401, message } = error
        return next(res.status(status).json(`user.auth: ${message}`))
      }

      if (!user.id) return next(res.status(400).json('user.auth: No user ID'))

      findUser(user.id)
    })
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (error) {
      const { status = 500, message } = error
      return next(res.status(status).json(`user.getAll: ${message}`))
    }
  }

  async update(req, res, next) {
    try {
      const { name, id } = req.body
      await User.update({ name }, { where: { id } })
      return res.json('User updated')
    } catch (error) {
      const { status = 403, message } = error
      return next(res.status(status).json(`user.update: ${message}`))
    }
  }
}

module.exports = new UsersController()
