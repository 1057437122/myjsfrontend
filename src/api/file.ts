import request from '@/utils/request'
export function fetchFiles(data: object) {
  return request({
    url: 'files',
    method: 'get',
    params: data
  })
}
export function createFile(data: object) {
  return request({
    url: 'files',
    method: 'post',
    data
  })
}
export function updateFile(fileId: string, data: object) {
  return request({
    url: 'files/' + fileId,
    method: 'patch',
    data
  })
}
export function fetchFileCount(data: object) {
  return request({
    url: 'files/count',
    method: 'get',
    params: data
  })
}
export function deleteFile(fileId: string) {
  return request({
    url: 'files/' + fileId,
    method: 'delete'
  })
}