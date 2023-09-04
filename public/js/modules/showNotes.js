function noteRemove(note) {
  const deleteButton = note.querySelector('.delete')

  deleteButton.addEventListener('click', async e => {
    const noteId = note.id.split('-')[1]

    await fetch(`/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(res => res.ok)
      .then(ok => {
        if (ok) note.remove()
        else alert('Note not deleted!')
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
  const noteList = document.body.querySelector('#root')
  const note = generateView(noteData)

  noteList.insertAdjacentHTML('afterbegin', note)
  const currentNote = noteList.querySelector(`#note-${noteData.id}`)

  noteRemove(currentNote)
}

async function showNotes() {
  const notes = await fetch('/notes/data').then(res => res.json())

  notes.forEach(note => {
    insertNote(note)
  })

  signoutButton()
}

function signoutButton() {
  const signoutButton = document.body.querySelector('#signoutButton')

  signoutButton.addEventListener('click', async e => {
    await fetch('/user/signout')
      .then(res => res.status)
      .then(status => {
        if (status === 200) window.location.href = '/'
        else alert('Erro ao sair!')
      })
  })
}

export default showNotes
