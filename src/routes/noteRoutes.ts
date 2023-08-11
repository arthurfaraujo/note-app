import { Router } from 'express'
import noteController from '../controllers/noteController'
import { isAuthenticated, isAuthorized } from '../middlewares/auth'

const routes = Router()

routes.get('/', isAuthenticated, noteController.noteListGet)
routes.post('/', isAuthenticated, noteController.noteCreatePost)
routes.put('/:id', isAuthorized, () => console.log('oi'))

export default routes
