import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Drag from '../views/Drag.vue'
import Drop from '../views/Drop.vue'
import Header from '../views/Header.vue'
import Double from '../views/Double.vue'
import Download from '../views/Download.vue'
import DropDown from '../views/Dropdown.vue';

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
  {
    path: '/drop',
    name: 'Drop',
    component: Drop
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
      },
    {
      path: '/double',
      name: 'Double',
      component: Double
      },
      {
        path: '/download',
        name: 'Download',
        component: Download
        },
        {
          path: '/dropdown',
          name: 'DropDown',
          component: DropDown,
        },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
