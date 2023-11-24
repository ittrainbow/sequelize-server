import { Error } from 'sequelize'

export type AppError = Error & { status: number }

export type UserType = {
  name: string
  email: string
  password?: string
  id: number
  admin: boolean
}

export type TicketType = {
  created: number
  creator: string | number
  description: string
  id: number
  issue: string
  problem: string
  projectid: string
  severity: string
  status: string
  solution: string
  updated: number
  updater: string | number
}