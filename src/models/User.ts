import { prisma } from '../prisma/connection'

interface IUser {
  nickname: string;
  email?: string;
  password: string;
  name: string;
  notes?: object[];
}

async function create(User: IUser) {
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

export default {
  create
}
