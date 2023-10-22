import { Request, Response } from 'express'
import Category from '../models/Category'
import { ITokenRequest } from '../interfaces/authInterfaces'
import { JwtPayload } from 'jsonwebtoken'

async function categoryGetData(req: ITokenRequest, res: Response) {
  const { nickname } = req.token as JwtPayload
  const categories = await Category.readAllByUser(nickname)

  return res.json(categories)
}

async function categoryNotesGetData(req: Request, res: Response) {
  const categoryId = Number(req.params.id)
  const notes = await Category.readNotesByCategory(categoryId).then(category => category?.notes)

  console.log(notes)
  return res.json(notes)
}

export default {
  categoryGetData,
  categoryNotesGetData
}