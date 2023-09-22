import { Router } from 'express'
import noteController from '../controllers/noteController'
import { isAuthenticated, isAuthorized } from '../middlewares/auth'
import {
  createSchema,
  updateSchema,
  deleteSchema
} from '../schemas/noteSchemas'
import validate from '../middlewares/validation'

const routes = Router()

routes.get('/', isAuthenticated, noteController.noteListGetData)
routes.post(
  '/',
  isAuthenticated,
  validate(createSchema),
  noteController.noteCreatePost
)
routes.put(
  '/:id',
  isAuthenticated,
  isAuthorized,
  validate(updateSchema) /* 0 */
)
routes.delete(
  '/:id',
  isAuthenticated,
  isAuthorized,
  validate(deleteSchema),
  noteController.noteDelete
)

export default routes
