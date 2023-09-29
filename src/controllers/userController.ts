import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'

async function userCreateGet(req: Request, res: Response) {
  res.render('signup')
}

async function userCreatePost(req: Request, res: Response) {
  const userCreateData = req.body
  const user = await User.create(userCreateData)

  if (user.created) {
    return res.status(201).json({ ...user })
  } else {
    return res.status(400).json({ ...user })
  }
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
      { nickname: userData.nickname },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    console.log(token)

    return res.json({ auth: true, token })
  }
}

/* async function userSignoutGet(req: Request, res: Response) {
  return res.clearCookie('nickname').clearCookie('name').end()
} */

async function userTokenVerify(req: Request, res: Response) {
  const token = req.body.token

  try {
    const tokenValid = jwt.verify(token, process.env.JWT_SECRET as string)

    return res.json({ valid: true })
  } catch (e) {
    return res.status(401).json({ valid: false })
  }
}

export default {
  userSigninGet,
  userCreateGet,
  userCreatePost,
  userAuthenticatePost /* 
  userSignoutGet, */,
  userTokenVerify
}
