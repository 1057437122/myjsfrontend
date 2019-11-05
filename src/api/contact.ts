import request from '@/utils/request'
export function fetchContact(data: string) {
  return request({
    url: 'contacts?lang=' + data,
    method: 'get'
  })
}

export function updateContact(data: object) {
  return request({
    url: 'contacts',
    method: 'post',
    data
  })
}