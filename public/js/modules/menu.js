const menu = document.body.querySelector('.menu')
const menuButton = document.body.querySelector('.btn-menu')
let menuActive = true

function toggleMenu() {
  if (menu.classList.contains('inactive')) {
    menu.classList.remove('inactive')
    menuActive = true
  } else {
    menu.classList.add('inactive')
    menuActive = false
  }
}

function mouseEnterMenu() {
  if (menu.classList.contains('inactive') && !menuActive) {
    menu.classList.remove('inactive')
  }
}

function mouseLeavesMenu() {
  if (!menu.classList.contains('inactive') && !menuActive) {
    menu.classList.add('inactive')
  }
}

function addMenu() {
  menuButton.addEventListener('click', toggleMenu)
  menu.addEventListener('mouseenter', mouseEnterMenu)
  menu.addEventListener('mouseleave', mouseLeavesMenu)
}

export default addMenu
