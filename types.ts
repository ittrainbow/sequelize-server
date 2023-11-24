import { Error } from 'sequelize'

export type AppError = Error & { status: number }

export type User = {
  name: string
  email: string
  id: number
  admin: boolean
}
