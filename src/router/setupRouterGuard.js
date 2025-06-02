// router/setupRouterGuard.js
import { useUserStore } from '@/stores/user.js'

export function setupRouterGuard(router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore() // Pinia actif ici
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  })
}
