export interface INoteCreate {
  title: string | null
  content: string
  type: number | null
  userNickname: string,
  category?: number | null
}

export interface INote {
  id: number
  title: string | null
  content: string
  type: number | null
  userNickname: string,
  categoryId: number | null
}

export interface INoteCreated {
  created: boolean
  id: number
}