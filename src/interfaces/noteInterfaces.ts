export interface INoteCreate {
  title: string | null
  content: string
  type: number | null
  userNickname: string
}

export interface INote {
  id: number
  title: string | null
  content: string
  type: number | null
  userNickname: string
}