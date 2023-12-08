import { getToken } from './auth.js'

const userName = document.body.querySelector('.userName')
const userPhoto = document.body.querySelector('.userPhoto')

async function getUserInfo() {
  const reqConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }

  const url = '/user/me/data'

  const userInfo = await fetch(url, reqConfig).then(res => res.json())

  console.log(userInfo)

  return userInfo
}

async function renderUserInfo() {
  const user = await getUserInfo()

  userName.textContent = user.nickname

  if (user.photo) {
    userPhoto.src = user.photo
  }
}

export default renderUserInfo
