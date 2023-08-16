import { prisma } from '../../prisma/connection'
import { IUser } from './User'

interface INoteCreateData {
  id?: number
  content: string
  type: number
  userNickname: string
}

export interface INote {
  id: number
  content?: string
  type?: number
  userNickname?: string
}

export interface INoteAuthorize {
  User: IUser
  Note: INote
}

async function create(Note: INoteCreateData): Promise<INote> {
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

async function authorizeUser({
  User,
  Note
}: INoteAuthorize): Promise<INote | null> {
  const authorized = await prisma.note.findUnique({
    where: {
      id: Note.id,
      userNickname: User.nickname
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
