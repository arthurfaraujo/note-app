import { getToken } from './auth.js'

const userName = document.body.querySelector('.userName')

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

async function renderUserInfo() {
  const user = await getUserInfo()

  userName.textContent = user.nickname
}

export default renderUserInfo
