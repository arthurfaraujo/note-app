function addNoteRemove(note) {
  const deleteButton = note.querySelector('.delete')

  deleteButton.addEventListener('click', async () => {
    const noteId = note.id.split('-')[1]

    await fetch(`/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(res => res.ok)
      .then(ok => {
        if (ok) note.remove()
        else alert('Erro ao deletar nota')
      })
  })
}

function generateView(noteData) {
  const note = `
  <div class="note" id="note-${noteData.id}">
          <div class="noteTitle" style="user-select: none">Título da nota</div>
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

function insertNote(noteData) {
  const noteList = document.body.querySelector('#root')
  const note = generateView(noteData)

  noteList.insertAdjacentHTML('afterbegin', note)
  const currentNote = noteList.querySelector(`#note-${noteData.id}`)

  addNoteRemove(currentNote)
}

async function showNotes() {
  const notes = await fetch('/notes/data').then(res => res.json())

  notes.forEach(note => {
    console.log(note)
    insertNote(note)
  })

  addSignoutButton()
}

function addSignoutButton() {
  const signoutButton = document.body.querySelector('#signoutButton')

  signoutButton.addEventListener('click', async () => {
    await fetch('/user/signout')
      .then(res => res.status)
      .then(status => {
        if (status === 200) window.location.href = '/'
        else alert('Erro ao sair')
      })
  })
}

showNotes()
