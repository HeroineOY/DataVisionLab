import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/Dashboard/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage,
    },
  ],
})
