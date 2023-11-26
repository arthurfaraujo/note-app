import { prisma } from '../../prisma/connection'

async function create({
  name,
  userNickname
}: {
  name: string
  userNickname: string
}) {
  const category = await prisma.category.create({
    data: {
      name,
      userNickname
    }
  })

  return category
}

async function readAllByUser(userNickname: string) {
  const categories = await prisma.category.findMany({
    where: { userNickname }
  })

  return categories
}

async function readNotesByCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { notes: true }
  })

  return category
}

export default {
  create,
  readAllByUser,
  readNotesByCategory
}
