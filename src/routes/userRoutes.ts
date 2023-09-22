import userController from '../controllers/userController'
import { Router } from 'express'
import z from 'zod'
import { isAuthenticated } from '../middlewares/auth'
import validate from '../middlewares/validation'

const routes = Router()

const signinSchema = z.object({
  body: z.object({
    nickname: z.string().min(4),
    password: z.string().min(8)
  })
})

const signupSchema = z.object({
  body: z.object({
    nickname: z.string().min(4),
    name: z.string().nullish(),
    email: z.string().email(),
    password: z.string().min(8)
  })
})

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
