import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface ITokenRequest extends Request {
  token?: string | JwtPayload
}