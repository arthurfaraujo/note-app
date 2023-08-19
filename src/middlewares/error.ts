import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'

function pageNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Page not found' })
}

function otherErrors(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'

  res.status(status).send(
    `
    <div style="text-align: center; font-family: monospace; font-weight: 800">
      <h1 style="font-size: 3rem">Error</h1>
      <p style="font-size: 2rem">${message}</p>
    </div>
    `
  )
}

export default {
  pageNotFound,
  otherErrors
}
