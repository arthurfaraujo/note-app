import { getToken } from './auth.js'
import { showNotes } from './showNotes.js'

const categoryList = document.body.querySelector('.categories')
/* const categories = [
  { name: 'teste1' },
  { name: 'teste2' },
  { name: 'teste3' },
  { name: 'teste4' }
] */

function generateView(categoryData) {
  const category = `
  <li class="menuItem">
    <span class="itemIcon"><iconify-icon
      icon="subway:pin"
      style="color: #000000; font-size: 1.5rem"
      ></iconify-icon
    ></span>
    <span class="itemText">${categoryData.name}</span>
  </li>`

  return category
}

function insertCategory(categoryData) {
  const category = generateView(categoryData)

  categoryList.insertAdjacentHTML('beforeend', category)
  categoryList.children[categoryList.children.length - 1].addEventListener('click', async() => await showNotes(categoryData.id))
}

async function showCategories() {
  const url = '/categories'
  const reqConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }

  const categories = await fetch(url, reqConfig).then(res => res.json())

  categories.forEach(category => {
    console.log(category)
    insertCategory(category)
  })
  /* categoriesTeste.forEach(category => {
    insertCategory(category)
  }) */
}

export default showCategories
