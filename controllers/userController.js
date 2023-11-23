const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { User } = require('../models')

const createToken = ({ id, email, admin = false }) => {
  return jsonwebtoken.sign({ id, email, admin }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async signup(req, res) {
    const { email, password, name } = req.body
    if (!email || !password || !name) return res.json({ errorMessage: 'Not enough data' })

    const gotUser = await User.findOne({ where: { email } })
    if (gotUser) return res.json({ errorMessage: 'email already in use' })

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, name })
    const token = createToken(user)

    return res.json({ token, user })
  }

  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.json({ errorMessage: 'User do not exists' })

    let pwdCheck = bcrypt.compareSync(password, user.password)
    if (!pwdCheck) return res.json('Wrong password')

    const token = createToken(user)
    return res.json({ user, token })
  }

  async auth(req, res) {
    const { authorization } = req.headers
    const headerToken = authorization && authorization.split(' ').at(-1)

    if (!headerToken) return res.json({ errorMessage: 'User not authorized' })

    const findUser = async (id) => {
      await User.findOne({ where: { id } })
        .then((response) => response.dataValues)
        .then((user) => {
          delete user.password
          const token = createToken(user)
          return res.json({ user, token })
        })
    }

    jsonwebtoken.verify(headerToken, process.env.SECRET_KEY, (error, user) => {
      if (error) return res.json({ errorMessage: 'Token not valid' })
      if (!user.id) return res.json({ errorMessage: 'No user ID' })
      findUser(user.id)
    })
  }

  async getUsers(_, res) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (error) {
      return res.json({ errorMessage: error.message })
    }
  }

  async updateUser(req, res) {
    try {
      const { name, id } = req.body
      await User.update({ name }, { where: { id } })
      return res.json('ok')
    } catch (error) {
      return res.json({ errorMessage: error.message })
    }
  }
}

module.exports = new UserController()
