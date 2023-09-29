import userController from '../controllers/userController'
import validate from '../middlewares/validation'
import { signinSchema, signupSchema } from '../schemas/userSchemas'
import { Router } from 'express'
import noteController from '../controllers/noteController'

const routes = Router()

routes.get('/', /* isAuthenticated, */ noteController.noteListGet)
routes.get('/signin', userController.userSigninGet)
routes.post(
  '/signin',
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

export default routes
