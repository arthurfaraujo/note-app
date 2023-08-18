import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

async function userCreateGet(req: Request, res: Response) {
  res.render('signup')
}

async function userCreatePost(req: Request, res: Response) {
  const userCreateData = req.body
  const userData = await User.create(userCreateData)

  res
    .cookie('userNickname', userData.nickname, {
      signed: true,
      httpOnly: true
    })
    .cookie('userName', userData.name, {
      signed: true,
      httpOnly: true
    })
    .redirect('/')
}

async function userSigninGet(req: Request, res: Response) {
  res.render('signin')
}

async function userAuthenticatePost(req: Request, res: Response) {
  const userData = req.body
  const userIsAuthenticated = await User.authenticate(userData)

  if (userIsAuthenticated === null) {
    return res.status(401).json({ error: 'Invalid credentials!' })
  }

  res
    .cookie('nickname', userIsAuthenticated.nickname, {
      signed: true,
      httpOnly: true
    })
    .cookie('userName', userIsAuthenticated.name, {
      signed: true,
      httpOnly: true
    })
    .redirect('/')
}

async function userIsAuthenticated(req: Request, res: Response) {
  const { nickname } = req.signedCookies

  if (!nickname) {
    return null
  }

  const authenticated = await User.isAuthenticated({ nickname })

  return authenticated
}

async function userSignoutGet(req: Request, res: Response) {
  return res.clearCookie('nickname').clearCookie('userName').end()
}

export default {
  userSigninGet,
  userCreateGet,
  userCreatePost,
  userAuthenticatePost,
  userIsAuthenticated,
  userSignoutGet
}
