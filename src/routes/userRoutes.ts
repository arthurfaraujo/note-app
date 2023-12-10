import userController from '../controllers/userController'
import { isAuthenticated } from '../middlewares/auth'
import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'

const upload = multer(multerConfig)

const routes = Router()

// routes.get('/signout', isAuthenticated, userController.userSignoutGet)
routes.get('/me/data', isAuthenticated, userController.userMeData)
routes.get('/me/profile', userController.userProfileGet)
routes.post('/token/verify', userController.userTokenVerify)
routes.post('/me/profile', isAuthenticated, upload.single('profilePhoto'), userController.userImagePost)
routes.put('/me/profile', isAuthenticated, upload.single('profilePhoto'), userController.userImagePut)

export default routes
