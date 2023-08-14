import { Request, Response, Router } from 'express'
import { isAuthenticated, isAuthorized } from '../middlewares/auth'

const routes = Router()

routes.get('/', isAuthenticated, (req: Request, res: Response) => {
  res.redirect('/notes')
})

export default routes
