import { Request, Response, NextFunction } from 'express'
import Note from '../models/Note'

async function noteListGet(req: Request, res: Response) {
  const userNickname = req.cookies.userNickname
  const notes = await Note.readAllByUser(userNickname)

  res.json(notes)
}

async function noteCreatePost(req: Request, res: Response) {
  const noteCreateData = req.body
  const userNickname = req.cookies.userNickname

  const noteData = await Note.create({ ...noteCreateData, userNickname })

  res.json(noteData)
}

export default {
  noteCreatePost,
  noteListGet
}
