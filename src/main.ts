import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Cookies from 'js-cookie'
import i18n from './lang'
import store from './store'


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './permission'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
