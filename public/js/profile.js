import { renderUserInfo } from './modules/userInfo.js'
import { isAuthenticated } from './modules/auth.js'

if (await isAuthenticated()) {
  await renderUserInfo()
} else {
  window.location.href = '/signin'
}
