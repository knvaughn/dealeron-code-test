import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReceiptView from '@/views/ReceiptView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/receipt',
    name: 'receipt',
    component: ReceiptView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
