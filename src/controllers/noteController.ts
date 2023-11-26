import { Request, Response } from 'express'
import Note from '../models/Note'
import { ITokenRequest } from '../interfaces/authInterfaces'
import { JwtPayload } from 'jsonwebtoken'

export async function noteListGet(req: Request, res: Response) {
  res.render('noteList')
}

async function noteListGetData(req: ITokenRequest, res: Response) {
  const { nickname } = req.token as JwtPayload

  const notes = await Note.readAllByUser(nickname)

  return res.json(notes)
}

async function noteCreatePost(req: ITokenRequest, res: Response) {
  const noteData = req.body
  const { nickname } = req.token as {
    nickname: string
    iat: number
    exp: number
  }

  const result = await Note.create({
    ...noteData,
    userNickname: nickname
  })

  return res.json({ created: result.created, id: result.id })
}

async function noteDelete(req: Request, res: Response) {
  const noteId = Number(req.params.id)
  const note = await Note.deleteById(noteId)

  res.json(note)
}

export default {
  noteCreatePost,
  noteListGet,
  noteListGetData,
  noteDelete
}
