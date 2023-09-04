import { Request, Response, Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { noteListGet } from '../controllers/noteController'

const routes = Router()

routes.get('/', isAuthenticated, noteListGet)

export default routes
