import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'
import { authorizeUser } from '../models/Note'
import jwt from 'jsonwebtoken'
import { string } from 'zod'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const { authorization } = req.headers

    const [, token] = authorization?.split(' ') || []

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    req.body.token = decoded

    return next()
  } catch (e) {
    /* return res.redirect('/user/signin') */
    return res.status(401).json({ error: 'Invalid token!' })
  }
}

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { nickname } = req.body.token
  const id = Number(req.params.id)

  const authorized = await authorizeUser(nickname, id)

  if (!authorized) {
    return res.status(403).json({ message: 'Unauthorized!' })
  }

  return next()
}
