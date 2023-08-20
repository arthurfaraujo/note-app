import { insertNote } from './showNotes.js'

export async function createNoteSend() {
  const createNoteSend = document.body.querySelector('.createNoteSend')
  const createNoteForm = document.body.querySelector('.createNoteForm')
  const createNoteTitle = createNoteForm.querySelector('.createNoteTitle')
  const createNoteContent = createNoteForm.querySelector('.createNoteContent')

  createNoteContent.addEventListener('click', () => {
    createNoteTitle.style.display = 'block'
    createNoteSend.style.display = 'block'
    createNoteTitle.style.fontSize = '1.2rem'
    createNoteContent.style.fontSize = '1.1rem'
    createNoteForm.contentEditable = 'true'
  })

  createNoteSend.addEventListener('click', () => {
    const createNoteData = Object.fromEntries(new FormData(createNoteForm))
    const { title, content } = createNoteData

    createNoteSend.style.display = 'none'
    createNoteTitle.style.display = 'none'
    createNoteTitle.value = null
    createNoteContent.style.fontSize = '1.2rem'
    createNoteContent.value = null

    if (title && content) {
      fetch('/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(createNoteData)
      }).then(async res => {
        res.status === 200
          ? insertNote(await res.json())
          : alert('Error creating note!')
      })
    } else {
      return 0
    }
  })
}

export default createNoteSend
