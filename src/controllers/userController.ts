import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { nextTick } from 'process'

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
    .cookie('loginId', userData.loginId, {
      signed: true,
      httpOnly: true
    })
    .json(userData)
}

async function userAuthenticatePost(req: Request, res: Response) {
  const userData = req.body
  const userIsAuthenticated = await User.authenticate(userData)

  if (userIsAuthenticated === null) {
    return res.status(401).json({ error: 'Invalid credentials!' })
  }

  res
    .cookie('userNickname', userIsAuthenticated.nickname, {
      signed: true
      // httpOnly: true
    })
    .cookie('userName', userIsAuthenticated.name, {
      signed: true,
      httpOnly: true
    })
    .cookie('loginId', userIsAuthenticated.loginId, {
      signed: true,
      httpOnly: true
    })
    .json(userIsAuthenticated)
}

async function userIsAuthenticated(req: Request, res: Response) {
  const userCookies = req.signedCookies
  const isAuthenticated = await User.isAuthenticated(userCookies)

  return isAuthenticated
}

export default {
  userCreatePost,
  userAuthenticatePost,
  userIsAuthenticated
}
