import i18n from "@/plugins/i18n.js";
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import { useUserStore } from "@/stores/user.js"
import { useNotificationStore } from '@/stores/useNotificationStore.js'

const {t} = i18n.global

const AuthService = {

  async login(newPlayer) {
    const { api } = useAuthFetch()
    try {
      const response = await api.post('/auth/login', newPlayer)
      const { token, player } = response.data
      const userStore = useUserStore()
      userStore.setToken(token)
      userStore.setPlayer(player)

      useNotificationStore().pushNotification([t('success.auth.login')], false);
      return { success: true }
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.auth.login')], true);
      return {message: t('errors.auth.login')}
    }
  },

  async logout() {
    const { api } = useAuthFetch()
    const userStore = useUserStore()
    try {
      await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${userStore.token}` }
      })
      userStore.$reset()
      userStore.clearAuth()
      useNotificationStore().pushNotification([t('success.auth.login')], false);
      return { success: true }
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.unknown')], true);
      return {message: t('errors.unknown')}
    }
  },

  async register(newPlayer) {
    const { api } = useAuthFetch()
    try {
      const response = await api.post('/auth/register', newPlayer)
      const { token, player } = response.data
      const userStore = useUserStore()
      userStore.setToken(token)
      userStore.setPlayer(player)
      useNotificationStore().pushNotification([t('success.auth.register')], false);
      return { success: true }
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.auth.register')], true);
      return {message: t('errors.auth.register')}
    }
  }
}

export default AuthService
