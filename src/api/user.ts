import request from '@/utils/request'
export function login(data: object) {
  return request({
    url: 'users/login',
    method: 'post',
    data
  })
}