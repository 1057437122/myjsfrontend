import request from '@/utils/request'
export function fetchWorks(data: object) {
  return request({
    url: 'works',
    method: 'get',
    params: data
  })
}
export function createWork(data: object) {
  return request({
    url: 'works',
    method: 'post',
    data
  })
}
export function updateWork(workId: string, data: object) {
  return request({
    url: 'works/' + workId,
    method: 'patch',
    data
  })
}
export function fetchWorkCount(data: object) {
  return request({
    url: 'works/count',
    method: 'get',
    params: data
  })
}
export function deleteWork(workId: string) {
  return request({
    url: 'works/' + workId,
    method: 'delete'
  })
}
export function fetchWorkFiles(id: string, data: object) {
  return request({
    url: 'work/' + id + '/files',
    method: 'get',
    params: data
  })
}

export function createWorkFile(data: object) {
  return request({
    url: 'work-files',
    method: 'post',
    data
  })
}

export function fetchUnappendFile(id: string, data: object) {
  return request({
    url: 'work/' + id + '/unappendfiles',
    method: 'get',
    params: data
  })
}

export function deleteWorkFile(id: string, fileId: string) {
  return request({
    url: 'work/' + id + '/files/' + fileId,
    method: 'delete',
  })
}