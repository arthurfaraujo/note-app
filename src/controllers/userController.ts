import { ITokenRequest } from './../interfaces/authInterfaces'
import { Request, Response } from 'express'
import User from '../models/User'
import Image from '../models/Image';
import jwt from 'jsonwebtoken'
import { createNewUser, tryLogin } from '../services/sendEmail'

async function userCreateGet(req: Request, res: Response) {
  res.render('signup')
}

async function userCreatePost(req: Request, res: Response) {
  const userCreateData = req.body
  const user = await User.create(userCreateData)
  const email = req.body.email

  if (user.created) {
    res.status(201).json({ ...user })
  } else {
    return res.status(400).json({ ...user })
  }

  await createNewUser(email)
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

    const email = await User.readEmailByNickname(userData.nickname)

    if (email) await tryLogin(email)
  } else {
    //jwt localStorage
    const token = jwt.sign(
      { nickname: userData.nickname },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    return res.json({ auth: true, token })
  }
}

async function userTokenVerify(req: Request, res: Response) {
  const token = req.body.token

  try {
    const tokenValid = jwt.verify(token, process.env.JWT_SECRET as string)

    return res.json({ valid: true })
  } catch (e) {
    return res.status(401).json({ valid: false })
  }
}

async function userMeData(req: ITokenRequest, res: Response) {
  const { nickname } = req.token as {
    nickname: string
    iat: number
    exp: number
  }

  const user = await User.readImages(nickname)

  res.json({ nickname, photo: user?.image?.path })
}

async function userImagePost(req: ITokenRequest, res: Response) {
  const { nickname } = req.token as {
    nickname: string
    iat: number
    exp: number
  }

  const path = `/img/user/${req.file?.filename}`

  if (!path) {
    new Error('File not found!')
  } else {
    const user = await Image.create({ path, userNickname: nickname })
  }

  res.json({created: true})
}

async function userImagePut(req: ITokenRequest, res: Response) {
  const { nickname } = req.token as {
    nickname: string
    iat: number
    exp: number
  }

  const path = `/img/user/${req.file?.filename}`

  if (!path) {
    new Error('File not found!')
  } else {
    const user = await Image.update({ path, userNickname: nickname })
  }

  res.json({updated: true})
}

export default {
  userSigninGet,
  userCreateGet,
  userCreatePost,
  userAuthenticatePost /* 
  userSignoutGet, */,
  userTokenVerify,
  userMeData,
  userImagePost,
  userImagePut
}
