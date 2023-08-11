import { Router } from 'express'
import noteController from '../controllers/noteController'
import { isAuthenticated } from '../middlewares/auth'

const routes = Router()

routes.get('/', isAuthenticated, noteController.noteListGet)
routes.post('/', isAuthenticated, noteController.noteCreatePost)

export default routes
