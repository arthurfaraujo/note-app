import userController from '../controllers/userController'
import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'

const routes = Router()

routes.get('/signin', userController.userSigninGet)
routes.post('/authenticate', userController.userAuthenticatePost)
routes.get('/signup', userController.userCreateGet)
routes.post('/signup', userController.userCreatePost)
routes.get('/signout', isAuthenticated, userController.userSignoutGet)

export default routes
