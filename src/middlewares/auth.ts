import { Request, Response, NextFunction } from 'express'
import userController from '../controllers/userController'
import noteController from '../controllers/noteController'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next?: NextFunction
): Promise<boolean | void | Response> {
  const authenticated = await userController.userIsAuthenticated(req, res)

  if (!authenticated) {
    return res.status(401).json({ error: 'Invalid credentials!' })
  }

  if (next) {
    return next()
  }

  return authenticated ? true : false
}

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const authenticated = await isAuthenticated(req, res)

  if (!authenticated) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }

  const authorized = await noteController.noteAuthorizeUser(req, res)

  if (!authorized) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }

  return next()
}
