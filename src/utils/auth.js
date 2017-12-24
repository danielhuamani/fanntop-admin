const TOKEN = 'token'
const USER_ID = 'user_id'
const EMAIL = 'email'

export function jwtDecode (token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace('-', '+').replace('_', '/')
  let dataUser = JSON.parse(window.atob(base64))
  console.log(dataUser, 'data')
  return dataUser
}

export function setTokenData (token) {
  let jsonData = jwtDecode(token)
  setToken(token)
  setUserId(jsonData.user_id)
  setUserId(jsonData.email)
}

export function setToken (token) {
  localStorage.setItem(TOKEN, token)
}

export function setUserId (userId) {
  localStorage.setItem(USER_ID, userId)
}

export function setEmail (email) {
  localStorage.setItem(EMAIL, email)
}

export function getToken () {
  return localStorage.getItem(TOKEN)
}

export function getUserId () {
  return localStorage.getItem(USER_ID)
}

export function getEmail () {
  return localStorage.getItem(EMAIL)
}
