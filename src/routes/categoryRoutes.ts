import categoryController from '../controllers/categoryController'
import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'

const routes = Router()

routes.get('/', isAuthenticated, categoryController.categoryGetData)
routes.get('/:id', categoryController.categoryNotesGetData)

export default routes