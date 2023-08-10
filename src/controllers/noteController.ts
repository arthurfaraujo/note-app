import { Request, Response, NextFunction } from 'express'
import Note from '../models/Note'

async function noteListGet(req: Request, res: Response) {
  const { userNickname } = req.body
  const notes = await Note.readAllByUser(userNickname)

  res.json(notes)
}

async function noteCreatePost(req: Request, res: Response) {
  const noteCreateData = req.body
  const noteData = await Note.create(noteCreateData)

  res.json(noteData)
}

export default {
  noteCreatePost,
  noteListGet
}
