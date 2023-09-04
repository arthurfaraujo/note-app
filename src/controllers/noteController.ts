import { Request, Response, NextFunction } from 'express'
import Note from '../models/Note'

export async function noteListGet(req: Request, res: Response) {
  res.render('noteList')
}

async function noteListGetData(req: Request, res: Response) {
  const { token } = req.body

  const notes = await Note.readAllByUser(token.nickname)

  return res.json(notes)
}

async function noteCreatePost(req: Request, res: Response) {
  const noteCreateData = req.body
  const { nickname } = req.body.token

  delete noteCreateData.token

  const noteData = await Note.create({
    ...noteCreateData,
    userNickname: nickname
  })

  return res.json(noteData)
}

async function noteDelete(req: Request, res: Response) {
  const noteId = req.params.id
  const note = await Note.deleteById(Number(noteId))

  res.json(note)
}

export default {
  noteCreatePost,
  noteListGet,
  noteListGetData,
  noteDelete
}
