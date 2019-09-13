import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import i18n from '@/lang';
import store from '@/store';

export async function uploadFile(file: BinaryType) {
  let formData = new FormData();
  formData.append('file', file)
  const ret = await axios.post(process.env.VUE_APP_BASE_API + 'files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': 'Bearer ' + store.getters.token
    }
  })
  if (ret.status === 200) {
    ret.data.path = ret.data.files[0].path.replace('public/', '')
    ret.data.url = process.env.VUE_APP_BASE_API + ret.data.path
    return ret.data
  } else {
    Message({
      message: i18n.t('uploadFailed') as string,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject()
  }
}