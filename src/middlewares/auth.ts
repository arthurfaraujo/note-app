import { Request, Response, NextFunction } from 'express'
import userController from '../controllers/userController'
import noteController from '../controllers/noteController'
import HttpException from '../exceptions/HttpException'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const authenticated = await userController.userIsAuthenticated(req, res)

  if (!authenticated) {
    return res.redirect(401, '/user/signin')
  }

  return next()
}

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const authorized = await noteController.noteAuthorizeUser(req, res)

  if (!authorized) {
    // return res.status(403).json({ message: 'Unauthorized!' })
    throw new HttpException(403, 'Unauthorized!')
  }

  return next()
}
