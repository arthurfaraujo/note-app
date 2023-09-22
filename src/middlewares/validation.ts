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
      const errors = []
      for (const error of e.errors) {
        errors.push({ location: error.path[1], message: error.message })
      }
      return res.status(400).json({ errors })
    }
  }
}

export default validate
