import { Request, Response, NextFunction } from 'express'
import Note, { INote } from '../models/Note'

async function noteListGet(req: Request, res: Response) {
  res.redirect('/noteList.html')
}

async function noteListGetData(req: Request, res: Response) {
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

async function noteAuthorizeUser(req: Request, res: Response) {
  const userData = req.signedCookies
  const noteId = req.params.id

  const authorized = await Note.authorizeUser({
    User: { ...userData },
    Note: { id: Number(noteId) }
  })

  return authorized
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
  noteAuthorizeUser,
  noteDelete
}
