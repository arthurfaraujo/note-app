import { Response, NextFunction } from 'express'
import { authorizeUser } from '../models/Note'
import jwt from 'jsonwebtoken'
import { ITokenRequest } from '../interfaces/authInterfaces'

export async function isAuthenticated(
  req: ITokenRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const { authorization } = req.headers

    const [, token] = authorization?.split(' ') || []

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    req.token = decoded

    return next()
  } catch (e) {
    /* return res.redirect('/signin') */
    return res.status(401).json({ error: 'Invalid token!' })
  }
}

export async function isAuthorized(
  req: ITokenRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { nickname } = req.token as { nickname: string, iat: number, exp: number }
  const id = Number(req.params.id)

  const authorized = await authorizeUser(nickname, id)

  if (!authorized) {
    return res.status(403).json({ message: 'Unauthorized!' })
  }

  return next()
}
