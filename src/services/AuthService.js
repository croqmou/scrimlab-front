import i18n from "@/plugins/i18n.js";
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import { useUserStore } from "@/stores/user.js"

const {t} = i18n.global

const AuthService = {

  async login(player) {
    const { api } = useAuthFetch()
    try {
      const response = await api.post('/auth/login', player)
      const { token } = response.data
      const userStore = useUserStore()
      userStore.setToken(token)
      return { success: true }
    } catch (error) {
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
      return { success: true }
    } catch (error) {
      return {message: t('errors.unknown')}
    }
  },

  async register(player) {
    const { api } = useAuthFetch()
    try {
      const response = await api.post('/auth/register', player)
      const { token } = response.data
      const userStore = useUserStore()
      userStore.setToken(token)
      return { success: true }
    } catch (error) {
      return {message: t('errors.auth.register')}
    }
  }
}

export default AuthService
