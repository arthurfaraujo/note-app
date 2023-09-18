import { Request, Response, NextFunction } from 'express'
import { Schema } from 'zod'

function validate(schema: Schema) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
  
      next()
    } catch (e: any) {
      return res.status(400).json(e.errors)
    }
  }
}

export default validate