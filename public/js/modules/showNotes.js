import { removeToken, getToken } from './auth.js'

const noteList = document.body.querySelector('#root')
const allNotesBtn = document.body.querySelector('#notes')

allNotesBtn.addEventListener('click', async () => await showNotes())

function noteRemove(note) {
  const deleteButton = note.querySelector('.delete')

  deleteButton.addEventListener('click', async e => {
    const noteId = note.id.split('-')[1]

    const url = `/notes/${noteId}`

    const reqConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }

    await fetch(url, reqConfig)
      .then(res => res.ok)
      .then(ok => {
        if (ok) note.remove()
        else alert('Failed to delete the note!')
      })
  })
}

function generateView(noteData) {
  const note = `
  <div class="note" id="note-${noteData.id}">
          <div class="noteTitle" style="user-select: none${
            noteData.title ? '' : '; display: none'
          }">${noteData.title}</div>
          <div class="noteContent" style="user-select: none">
            ${noteData.content}
          </div>
          <div class="noteOptions">
            <div class="delete" style="user-select: none">
              <iconify-icon
                icon="ic:baseline-delete"
                style="font-size: 1.51rem"
              ></iconify-icon>
            </div>
          </div>
        </div>
  `

  return note
}

export function insertNote(noteData) {
  const note = generateView(noteData)

  noteList.insertAdjacentHTML('afterbegin', note)
  const currentNote = noteList.querySelector(`#note-${noteData.id}`)

  noteRemove(currentNote)
}

export async function showNotes(categoryId) {
  const url = categoryId ? `/categories/${categoryId}` : '/notes'

  noteList.innerHTML = ''

  const reqConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
  const notes = await fetch(url, reqConfig).then(res => res.json())

  notes.forEach(note => {
    insertNote(note)
  })

  signoutButton()
}

function signoutButton() {
  const signoutButton = document.body.querySelector('#signoutButton')

  signoutButton.addEventListener('click', removeToken)
}

export default showNotes
