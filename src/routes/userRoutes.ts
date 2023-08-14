import userController from '../controllers/userController'
import { Router } from 'express'

const routes = Router()

routes.get('/signin', userController.userLoginGet)
routes.post('/', userController.userCreatePost)
routes.post('/authenticate', userController.userAuthenticatePost)

export default routes
