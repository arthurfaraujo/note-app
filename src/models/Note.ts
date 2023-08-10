import { prisma } from '../../prisma/connection'

interface INote {
  id?: number;
  content: string;
  type: number;
  userNickname: string;
}

async function create(Note: INote): Promise<INote> {
  const note = await prisma.note.create({
    data: {
      content: Note.content,
      type: Note.type,
      userNickname: Note.userNickname
    }
  })

  return note
}

async function readAllByUser(userNickname: string): Promise<INote[]> {
  const notes = await prisma.note.findMany({
    where: { userNickname }
  })

  return notes
}

export default {
  create,
  readAllByUser
}
