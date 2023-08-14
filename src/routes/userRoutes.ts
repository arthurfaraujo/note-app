import userController from '../controllers/userController'
import { Router } from 'express'

const routes = Router()

routes.get('/signin', userController.userLoginGet)
routes.post('/authenticate', userController.userAuthenticatePost)
routes.get('/signup', userController.userCreateGet)
routes.post('/signup', userController.userCreatePost)

export default routes
