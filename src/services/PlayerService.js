// services/playerService.js
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import { useUserStore } from "@/stores/user.js"


export const register = async (player) => {
  const { api } = useAuthFetch()
  try {
    const response = await api.post('/auth/register', player)

    console.log('auth')

    const { token } = response.data
    const userStore = useUserStore()
    userStore.setToken(token)

    return { success: true }
  } catch (error) {
    console.error('Error registering player:', error)
    return { message: 'error.unknown.error' }
  }
}
