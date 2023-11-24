import { Error } from 'sequelize'

export type AppError = Error & { status: number }

export type UserType = {
  name: string
  email: string
  password?: string
  id: number
  admin: boolean
}
