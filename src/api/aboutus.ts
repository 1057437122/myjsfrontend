import request from '@/utils/request'
export function fetchAboutus(data: string) {
  return request({
    url: 'abouts?lang=' + data,
    method: 'get'
  })
}

export function updateAboutus(data: object) {
  return request({
    url: 'abouts',
    method: 'post',
    data
  })
}