import Cookies from 'js-cookie'

const TokenKey = 'WebsiteAdminToken'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(val: string) {
  return Cookies.set(TokenKey, val)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}