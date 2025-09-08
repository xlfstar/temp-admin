import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
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
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const isLogin = useAuthStore().isLogin
  if (to.name === 'Login') {
    if (isLogin) {
      return { name: 'Dashboard' }
    }
  } else {
    if (!isLogin) {
      return { name: 'Login' }
    }
  }
})
export default router
