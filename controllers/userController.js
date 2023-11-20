const ErrorApi = require('../error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { query } = require('../db')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) return next(ErrorApi.badRequest('Некорректный email или password'))

    const candidate = await User.findOne({ where: { email } })
    if (candidate) return next(ErrorApi.badRequest('Пользователь с таким email уже существует'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return next(ErrorApi.internal('Пользователь не найден'))

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ErrorApi.internal('Указан неверный пароль'))

    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async check(req, res, next) {
    // const { id, email, role } = req.user
    // const token = generateJwt(id, email, role)
    const { id } = req.query
    if (!id) return next(ErrorApi.badRequest('No user ID'))
    return res.json(id)
  }
}

module.exports = new UserController()
