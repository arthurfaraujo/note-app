export async function isAuthenticated() {
  const token = localStorage.getItem('@notefy:token')

  if (token) {
    const url = '/user/token/verify'

    const reqConfig = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token })
    }

    const tokenValid = await fetch(url, reqConfig).then(res => res.json())

    if (!tokenValid.valid) {
      removeToken()
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

export function getToken() {
  return localStorage.getItem('@notefy:token')
}

export function setToken(token) {
  localStorage.setItem('@notefy:token', token)
}

export function removeToken() {
  if (getToken()) localStorage.removeItem('@notefy:token')
  window.location.href = '/user/signin'
}
