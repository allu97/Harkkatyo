'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import PostComponent from '@/components/PostComponent'
import PostSearch from '@/components/PostSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostComponent
    },
    {
      path: '/search',
      name: 'search',
      component: PostSearch
    },
    {
      // if user tries to access page that doesn't exist, redirect to search-page
      path: '*',
      redirect: 'search'
    }
  ]
})
