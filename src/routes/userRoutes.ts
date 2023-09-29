import userController from '../controllers/userController'
import { Router } from 'express'

const routes = Router()

// routes.get('/signout', isAuthenticated, userController.userSignoutGet)
routes.post('/token/verify', userController.userTokenVerify)

export default routes
