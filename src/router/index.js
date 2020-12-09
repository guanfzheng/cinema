import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginRegister from '../views/LoginRegister.vue'
import Detail from '../views/Detail.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
  const routes = [
  {
  	path: '/',
  	redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginregister',
    name: 'LoginRegister',
    component: LoginRegister
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
