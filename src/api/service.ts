import request from '@/utils/request'
export function fetchService(data: string) {
  return request({
    url: 'services?lang=' + data,
    method: 'get'
  })
}

export function updateService(data: object) {
  return request({
    url: 'services',
    method: 'post',
    data
  })
}