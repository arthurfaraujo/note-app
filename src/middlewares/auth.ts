import { Request, Response, NextFunction } from 'express'
import userController from '../controllers/userController'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isAuthenticated = await userController.userIsAuthenticated(req, res)

  if (isAuthenticated === null) {
    return res.status(401).json({ error: 'Invalid credentials!' })
  }

  next()
}
