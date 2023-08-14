import { Router } from 'express'
import noteController from '../controllers/noteController'
import { isAuthenticated, isAuthorized } from '../middlewares/auth'

const routes = Router()

routes.get('/' /* , isAuthenticated */, noteController.noteListGet)
routes.get('/data', isAuthenticated, noteController.noteListGetData)
routes.post('/', isAuthenticated, noteController.noteCreatePost)
routes.put('/:id', isAuthorized /* 0 */)

export default routes
