import { AppError, UserType } from '../types'
import { User } from '../models'
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const createToken = ({ id, email, admin = false }: Pick<UserType, 'id' | 'email' | 'admin'>) => {
  return jsonwebtoken.sign({ id, email, admin }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async signup(req: any, res: any, next: any) {
    const { email, password, name } = req.body
    if (!email || !password || !name) return next(res.status(400).json('Not enough data'))

    const gotUser = await User.findOne({ where: { email } })
    if (gotUser) return next(res.status(403).json('Email already in use'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, name })
    const token = createToken(user)

    return res.json({ user, token })
  }

  // working
  async login(req: any, res: any, next: any) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return next(res.status(400).json('User does not exists'))

    let pwdCheck = bcrypt.compareSync(password, user.password)
    if (!pwdCheck) return next(res.status(403).json('Wrong password'))

    const token = createToken(user)
    return res.json({ user, token })
  }

  // working
  async auth(req: any, res: any, next: any) {
    const { authorization } = req.headers
    const headerToken = authorization && authorization.split(' ')[1]

    if (!headerToken) return next(res.status(401).json('User not authorized (token probably expired)'))

    const findUser = async (id: number) => {
      await User.findOne({ where: { id } })
        .then((response: { dataValues: UserType }) => response.dataValues)
        .then((user: UserType) => {
          delete user.password
          const token = createToken(user)
          return res.json({ user, token })
        })
    }

    jsonwebtoken.verify(headerToken, process.env.SECRET_KEY, (error: AppError, user: UserType) => {
      if (error) {
        const { status = 401, message } = error
        return next(res.status(status).json(message))
      }

      if (!user.id) return next(res.status(400).json('No user ID'))

      findUser(user.id)
    })
  }

  // working
  async getUsers(req: any, res: any, next: any) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (error) {
      const { status = 500, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }

  // working
  async updateUser(req: any, res: any, next: any) {
    try {
      const { name, id } = req.body
      await User.update({ name }, { where: { id } })
      return res.json('User updated')
    } catch (error) {
      const { status = 403, message } = error as AppError
      return next(res.status(status).json(message))
    }
  }
}

module.exports = new UserController()
