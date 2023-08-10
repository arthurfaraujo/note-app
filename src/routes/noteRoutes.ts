import { Router } from 'express'
import { Response, Request } from 'express'
import Note from '../models/Note'

const routes = Router()

routes.get('/data', (req: Request, res: Response) => {
  res.json({ oi: 'oi' })
})

export default routes
