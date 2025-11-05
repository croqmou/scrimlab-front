// services/AuthService.js
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import { useUserStore } from "@/stores/user.js"


export const login = async (player) => {
  const { api } = useAuthFetch()
  try {
    const response = await api.post('/auth/login', player)
    const {token} = response.data
    const userStore = useUserStore()
    userStore.setToken(token)

    return {success: true}
  } catch (error) {
    console.error('Error logging player:', error)
    return {message: 'unknown.error'}
  }
}


export const authLogout = async () => {
  const { api } = useAuthFetch()
  const userStore = useUserStore()
  await api.post('/auth/logout', {}, {
    headers: { Authorization: `Bearer ${userStore.token}` }
  })
}
export const register = async (player) => {
  const { api } = useAuthFetch()
  try {
    const response = await api.post('/auth/register', player)
    const { token } = response.data
    const userStore = useUserStore()
    userStore.setToken(token)

    return { success: true }
  } catch (error) {
    console.error('Error registering player:', error)
    return { message: 'unknown.error' }
  }
}
