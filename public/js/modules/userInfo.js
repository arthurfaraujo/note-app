import { getToken } from './auth.js'

const profileForm = document.body.querySelector('.profileForm')
const userProfile = document.body.querySelector('.userProfile')
const userName = document.body.querySelector('.profileName')
const userPhoto = document.body.querySelector('.profilePhoto')

let method = 'POST'

async function uploadPhoto(e) {
  e.preventDefault()

  const formData = new FormData(profileForm)

  const reqConfig = {
    method,
    body: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }

  const url = '/user/me/profile'

  const res = await fetch(url, reqConfig).then(res => res.json())

  if (res.created || res.updated) {
    method = 'PUT'
    userPhoto.src = res.photo
    alert('Photo uploaded')
  } else {
    alert('There was an error')
  }
}

export function addProfileLink() {
  userProfile.addEventListener('click', () => {
    window.location.href = '/user/me/profile'
  })
}

async function getUserInfo() {
  const reqConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }

  const url = '/user/me/data'

  const userInfo = await fetch(url, reqConfig).then(res => res.json())

  return userInfo
}

export async function renderUserInfo() {
  const user = await getUserInfo()

  userName.textContent = user.nickname

  if (user.photo) {
    method = 'PUT'
    userPhoto.src = user.photo
  } else {
    userPhoto.src = '/img/user/default.png'
  }

  profileForm.onsubmit = async e => {
    await uploadPhoto(e)
  }
}
