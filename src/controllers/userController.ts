import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

interface ICookies {
  nickname: string
  name?: string | null
}

async function userCreateGet(req: Request, res: Response) {
  res.render('signup')
}

async function userCreatePost(req: Request, res: Response) {
  const userCreateData = req.body
  /* const userData =  */ await User.create(userCreateData)

  res
    /*     .cookie('nickname', userData.nickname, {
      signed: true,
      httpOnly: true
    })
    .cookie('name', userData.name, {
      signed: true,
      httpOnly: true
    }) */
    .redirect('/user/signin')
}

async function userSigninGet(req: Request, res: Response) {
  res.render('signin')
}

async function userAuthenticatePost(req: Request, res: Response) {
  const userData = req.body
  const authenticated = await User.authenticate(userData)

  if (!authenticated) {
    // o erro que o model joga impede de chegar nessa res
    return res.status(401).json({ error: 'Invalid credentials!' })
  } else {
    res
      .cookie('nickname', authenticated.nickname, {
        signed: true,
        httpOnly: true
      })
      .cookie('name', authenticated.name, {
        signed: true,
        httpOnly: true
      })
      .redirect('/')
  }
}

async function userIsAuthenticated(req: Request, res: Response) {
  const { nickname }: ICookies = req.signedCookies

  if (!nickname) {
    return null
  }

  const authenticated = await User.isAuthenticated({ nickname })

  return authenticated
}

async function userSignoutGet(req: Request, res: Response) {
  return res.clearCookie('nickname').clearCookie('name').end()
}

export default {
  userSigninGet,
  userCreateGet,
  userCreatePost,
  userAuthenticatePost,
  userIsAuthenticated,
  userSignoutGet
}
