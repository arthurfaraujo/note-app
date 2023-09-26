import showNotes from './modules/showNotes.js'
import noteSend from './modules/sendNotes.js'
import { isAuthenticated } from './modules/auth.js'

if (await isAuthenticated()) {
  await showNotes()
  noteSend()
} else {
  window.location.href = '/signin'
}
