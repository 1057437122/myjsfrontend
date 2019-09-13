import router from './router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from './store';
NProgress.configure({ showSpinner: false }) //
const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let token = store.getters.token
  if (!token) {
    token = getToken()
    store.commit('SET_TOKEN', token)
  }
  if (token) {
    // 登录过了
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})