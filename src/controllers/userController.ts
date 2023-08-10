import { Request, Response } from 'express'
import User from '../models/User'

async function userCreatePost(req: Request, res: Response) {
  const userCreateData = req.body
  const userData = await User.create(userCreateData)

  res.json(userData)
}

async function userAuthenticatePost(req: Request, res: Response) {
  const userData = req.body
  const userIsAuthenticated = await User.authenticate(userData)

  if (userIsAuthenticated === null) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  res.json(userIsAuthenticated)
}
export default {
  userCreatePost,
  userAuthenticatePost
}
