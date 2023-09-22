import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'

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

  res.json({created: true})
}

async function userSigninGet(req: Request, res: Response) {
  res.render('signin')
}

async function userAuthenticatePost(req: Request, res: Response) {
  const userData = req.body
  const authenticated = await User.authenticate(userData)

  if (!authenticated) {
    // throw new Error('Invalid credentials!')
    res.status(401).json({ auth: false, error: 'Invalid credentials!' })
  } else {
    //jwt localStorage  
    const token = jwt.sign(
      { nickname: authenticated.nickname },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    console.log(token)

    return res.json({ auth: true, token })

    // normal cookie
    /* return res
      .status(200)
      .cookie('nickname', authenticated.nickname, {
        signed: true,
        httpOnly: true
      })
      .cookie('name', authenticated.name, {
        signed: true,
        httpOnly: true
      })
      .json({ message: 'User authenticated!' }) */
  }
}

async function userSignoutGet(req: Request, res: Response) {
  return res.clearCookie('nickname').clearCookie('name').end()
}

export default {
  userSigninGet,
  userCreateGet,
  userCreatePost,
  userAuthenticatePost,
  userSignoutGet
}
