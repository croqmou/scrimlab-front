// router/setupRouterGuard.js
import { useUserStore } from '@/stores/user.js'

export function setupRouterGuard(router) {
  router.beforeEach((to, from, next) => {
    next()
  })
}
