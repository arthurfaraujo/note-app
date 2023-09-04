export function isAuthenticated() {
  return localStorage.getItem('@notefy:token') !== null
}

export function getToken() {
  return localStorage.getItem('@notefy:token')
}

export function setToken(token) {
  localStorage.setItem('@notefy:token', token)
}

export function removeToken() {
  localStorage.removeItem('@notefy:token')
  window.location.href = '/user/signin'
}
