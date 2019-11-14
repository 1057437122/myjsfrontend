import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashborad',
      component: () => import('./views/Dashboard.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Aboutus.vue')
    },
    {
      path: '/works',
      name: 'artwork',
      component: () => import('./views/Work.vue')
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('./views/File.vue')
    },
    {
      path: '/works/:id/files',
      name: 'artdetail',
      component: () => import('./views/WorkFile.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('./views/Service.vue')
    },
  ]
})
