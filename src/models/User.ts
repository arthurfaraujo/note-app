import { prisma } from '../../prisma/connection'
import bcrypt from 'bcrypt'
import {
  IUser,
  IUserAuthenticate,
  IUserFound,
  IUserCreated
} from '../interfaces/userInterfaces'

async function create(User: IUser): Promise<IUserCreated> {
  User.password = await bcrypt.hash(
    User.password,
    Number(process.env.SALT_ROUNDS) || 10
  )

  try {
    const user = await prisma.user.create({
      data: {
        nickname: User.nickname,
        email: User.email,
        name: User.name,
        password: User.password
      }
    })

    return { created: true }
  } catch (e: any) {
    return { created: false, code: e.code, location: e.meta.target }
  }
}

async function readByNickname(nickname: string): Promise<IUserFound | null> {
  const user = await prisma.user.findUnique({
    where: {
      nickname
    },
    select: {
      nickname: true,
      name: true,
      password: true
    }
  })

  return user
}

async function authenticate(User: IUserAuthenticate): Promise<boolean> {
  const user = await readByNickname(User.nickname)

  if (!user?.password) {
    return false
  } else {
    const passwordMatch = await bcrypt.compare(User.password, user.password)

    return passwordMatch && true
  }
}

async function isAuthenticated(User: IUser): Promise<boolean> {
  const { nickname } = User

  const user = await prisma.user.findUnique({
    where: {
      nickname
    }
  })

  return user ? true : false
}

export default {
  create,
  authenticate,
  isAuthenticated
}
