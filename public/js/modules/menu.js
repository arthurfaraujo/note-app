const menu = document.body.querySelector('.menu')
const menuButton = document.body.querySelector('.btn-menu')

function toggleMenu() {
  if (menu.classList.contains('unactive')) {
    menu.classList.remove('unactive')
  } else {
    menu.classList.add('unactive')
  }
}

function addMenu() {
  menuButton.addEventListener('click', toggleMenu)
}

export default addMenu
