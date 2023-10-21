import showNotes from './modules/showNotes.js'
import noteSend from './modules/sendNotes.js'
import { isAuthenticated } from './modules/auth.js'
import showCategories from './modules/showCategories.js'
import addMenu from './modules/menu.js'

if (await isAuthenticated()) {
  addMenu()
  noteSend()
  Promise.all([showNotes(), showCategories()]).then(console.log('hahahahah'))
} else {
  window.location.href = '/signin'
}
