import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'
import { authorizeUser } from '../models/Note'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { nickname } = req.signedCookies

  if (!nickname) {
    return res.redirect('/user/signin')
  }

  return next()
}

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { nickname } = req.signedCookies
  const id = Number(req.params.id)

  const authorized = await authorizeUser({ User: { nickname }, Note: { id } })

  if (!authorized) {
    return res.status(403).json({ message: 'Unauthorized!' })
  }

  return next()
}
