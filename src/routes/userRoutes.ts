import userController from '../controllers/userController'
import { Router } from 'express'
import { signinSchema, signupSchema } from '../schemas/userSchemas'
import { isAuthenticated } from '../middlewares/auth'
import validate from '../middlewares/validation'

const routes = Router()

routes.get('/signin', userController.userSigninGet)
routes.post(
  '/authenticate',
  validate(signinSchema),
  userController.userAuthenticatePost
)
routes.get('/signup', userController.userCreateGet)
routes.post(
  '/signup',
  (req, res, next) => {
    console.log(req.body)
    next()
  },
  validate(signupSchema),
  userController.userCreatePost
)
routes.get('/signout', isAuthenticated, userController.userSignoutGet)

export default routes
