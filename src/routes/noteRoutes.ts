import { Router } from 'express'
import noteController from '../controllers/noteController'
import { isAuthenticated, isAuthorized } from '../middlewares/auth'

const routes = Router()

/* routes.get('/', isAuthenticated, noteController.noteListGet) */
routes.get('/', isAuthenticated, noteController.noteListGetData)
routes.post('/', isAuthenticated, noteController.noteCreatePost)
routes.put('/:id', isAuthenticated, isAuthorized /* 0 */)
routes.delete('/:id', isAuthenticated, isAuthorized, noteController.noteDelete)

export default routes
