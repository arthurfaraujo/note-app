import userController from '../controllers/userController'
import { Router } from 'express'
import z from 'zod'
import { isAuthenticated } from '../middlewares/auth'
import validate from '../middlewares/validation'

const routes = Router()

const signinSchema = z.object({
  body: z.object({
    nickname: z.string(),
    password: z.string().min(4)
  })
})

routes.get('/signin', userController.userSigninGet)
routes.post('/authenticate', validate(signinSchema), userController.userAuthenticatePost)
routes.get('/signup', userController.userCreateGet)
routes.post('/signup', userController.userCreatePost)
routes.get('/signout', isAuthenticated, userController.userSignoutGet)

export default routes
