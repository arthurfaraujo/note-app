import { Router } from 'express'
import noteController from '../controllers/noteController'

const routes = Router()

routes.get('/', noteController.noteListGet)

routes.post('/', noteController.noteCreatePost)

export default routes
