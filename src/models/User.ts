import { prisma } from '../../prisma/connection'

interface IUserCreateData {
  nickname: string;
  email: string | null;
  password: string;
  name: string;
}

interface IUser {
  nickname: string;
  email?: string | null;
  password: string;
  name?: string | null;
  notes?: object[] | null;
}

async function create(User: IUserCreateData): Promise<IUser> {
  const user = await prisma.user.create({
    data: {
      nickname: User.nickname,
      email: User.email,
      name: User.name,
      password: User.password
    }
  })

  return user
}

async function authenticate(User: IUser): Promise<IUser | null> {
  const user = await prisma.user.findUnique({
    where: {
      nickname: User.nickname,
      password: User.password
    }
  })

  return user
}

export default {
  create,
  authenticate
}
