import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/category/index.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/product/index.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/index.vue')
    },
    {
      path: '/website',
      name: 'website',
      component: () => import('@/views/website/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
