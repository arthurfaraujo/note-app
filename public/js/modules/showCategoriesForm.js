import { getToken } from './auth.js'

const categorySelect = document.body.querySelector('.formCategories')

function generateView(categoryData) {
  const category = `
  <option class="menuItem" value="${categoryData.id}">
    <span class="itemText">${categoryData.name}</span>
  </option>`

  return category
}

function insertCategory(categoryData) {
  const category = generateView(categoryData)

  categorySelect.insertAdjacentHTML('beforeend', category)
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
    insertCategory(category)
  })
}

export default showCategories
