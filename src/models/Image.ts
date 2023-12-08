import { prisma } from '../../prisma/connection'

async function create({
  path,
  userNickname
}: {
  path: string
  userNickname: string
}): Promise<{ path: string; userNickname: string } | null> {
  const image = await prisma.image.create({
    data: {
      path,
      userNickname
    },
    select: {
      path: true,
      userNickname: true
    }
  })

  return image
}

async function update({
  userNickname,
  path
}: {
  userNickname: string
  path: string
}): Promise<{ path: string; userNickname: string } | null> {
  const image = await prisma.image.update({
    where: { userNickname },
    data: { path },
    select: {
      path: true,
      userNickname: true
    }
  })

  return image
}

export default {
  create,
  update
}
