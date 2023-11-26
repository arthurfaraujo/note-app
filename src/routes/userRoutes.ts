import userController from '../controllers/userController'
import { isAuthenticated } from '../middlewares/auth'
import { Router } from 'express'

const routes = Router()

// routes.get('/signout', isAuthenticated, userController.userSignoutGet)
routes.post('/token/verify', userController.userTokenVerify)
routes.get('/me/data', isAuthenticated, userController.userMeData)

export default routes
