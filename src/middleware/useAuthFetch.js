// middleware/useAuthFetch.js
import axios from 'axios'
import { useUserStore } from '@/stores/user.js'

export function useAuthFetch() {
  const userStore = useUserStore()

  const api = axios.create({
    baseURL: 'http://localhost:8080'
  })

  // Ajouter le token dans les headers
  api.interceptors.request.use(config => {

    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  })

  // Intercepter les 401
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        userStore.clearAuth()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  return { api }
}
