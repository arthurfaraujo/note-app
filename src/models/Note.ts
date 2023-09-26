import { prisma } from '../../prisma/connection'
import { INote, INoteCreate, INoteCreated } from '../interfaces/noteInterfaces'

async function create(Note: INoteCreate): Promise<INoteCreated> {
  const note = await prisma.note.create({
    data: {
      title: Note.title || null,
      content: Note.content,
      type: Note.type,
      userNickname: Note.userNickname
    }
  })

  return {created: true, id: note.id}
}

async function readAllByUser(nickname: string): Promise<INote[]> {
  const notes = await prisma.note.findMany({
    where: { userNickname: nickname }
  })

  return notes
}

export async function authorizeUser(
  userNickname: string,
  noteId: number
): Promise<INote | null> {
  const authorized = await prisma.note.findUnique({
    where: {
      id: noteId,
      userNickname: userNickname
    }
  })

  return authorized
}

async function deleteById(id: number): Promise<INote | null> {
  const note = await prisma.note.delete({
    where: { id }
  })

  return note
}

export default {
  create,
  readAllByUser,
  authorizeUser,
  deleteById
}
