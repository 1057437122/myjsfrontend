import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user';
import { setToken, removeToken } from '@/utils/auth';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
    token: state => {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, data) {
      const { username, password } = data
      const res: any = await login({ name: username, password: password })
      if (res) {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        return
      } else {
        return
      }
      // return new Promise((resolve, reject) => {
      //   login({ name: username, password: password }).then(res => {
      //     commit('SET_TOKEN', res.token)
      //     setToken(res.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
})

export default store
