import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Drag from '../views/Drag.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
  path: '/drag',
  name: 'Drag',
  component: Drag
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
