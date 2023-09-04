import { insertNote } from './showNotes.js'
import { getToken } from './auth.js'

const createNoteSend = document.body.querySelector('.createNoteSend')
const createNoteForm = document.body.querySelector('.createNoteForm')
const createNoteTitle = createNoteForm.querySelector('.createNoteTitle')
const createNoteContent = createNoteForm.querySelector('.createNoteContent')

async function noteSend() {
  createNoteContent.addEventListener('click', openForm)

  createNoteSend.addEventListener('click', sendForm)
}

function openForm() {
  createNoteTitle.style.display = 'block'
  createNoteSend.style.display = 'block'
  createNoteTitle.style.fontSize = '1.2rem'
  createNoteContent.style.fontSize = '1.1rem'
  createNoteForm.contentEditable = 'true'
}

function sendForm() {
  const createNoteData = Object.fromEntries(new FormData(createNoteForm))
  const { content } = createNoteData

  closeForm()

  if (content) {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(createNoteData)
    }).then(async res => {
      res.status === 200
        ? insertNote(await res.json())
        : alert('Error creating note!')
    })
  } else {
    return 0
  }
}

function closeForm() {
  createNoteSend.style.display = 'none'
  createNoteTitle.style.display = 'none'
  createNoteTitle.value = null
  createNoteContent.style.fontSize = '1.2rem'
  createNoteContent.value = null
}

export default noteSend
