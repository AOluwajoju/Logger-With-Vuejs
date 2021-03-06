import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Logs from '../views/Logs.vue'
import Register from '../views/Register.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      var loggedIn = false;
      if (localStorage.getItem('token')) { loggedIn = true }
      if (loggedIn == true){
        next({name: 'Home'})
      }else next()
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      var loggedIn = false;
      if (localStorage.getItem('token')) { loggedIn = true }
      if (loggedIn == false){
        next({name: 'Login'})
      }else next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      var loggedIn = false;
      if (localStorage.getItem('token')) { loggedIn = true }
      if (loggedIn == true){
        next({name: 'Home'})
      }else next()
    }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    beforeEnter: (to, from, next) => {
      var loggedIn = false;
      if (localStorage.getItem('token')) { loggedIn = true }
      if (loggedIn == false){
        next({name: 'Login'})
      }else next()
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




export default router
