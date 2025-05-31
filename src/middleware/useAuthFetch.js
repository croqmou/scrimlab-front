import axios from 'axios'
import {useUserStore} from "@/stores/userStore.js"
import router from "@/router/index.js"
import {useNotificationStore} from "@/stores/useNotificationStore.js";

const baseUrl = import.meta.env.VITE_APP_LOCAL_URL


export const useAuthFetch = () => {

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('authToken', newToken)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  const setUniqueId = (newUniqueId) => {
    if (newUniqueId) {
      localStorage.setItem('uniqueId', newUniqueId)
    } else {
      localStorage.removeItem('uniqueId')
    }
  }

  const api = axios.create({
    baseURL: baseUrl,
  })

  api.interceptors.request.use(config => {
    if (localStorage.getItem('authToken')) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`
    }
    if (localStorage.getItem('authToken')) {
      config.headers['X-Unique-Id'] = localStorage.getItem('uniqueId')
    }
    return config
  })

  api.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status === 401) {
      if (localStorage.getItem('userDetails')) {
        useUserStore().clearUserDetails()
      }
      localStorage.removeItem('authToken')
      localStorage.removeItem('uniqueId')
      if (!(router.currentRoute.value.name === "login")) {
        return router.push({name: 'login'})
      }

    }
    if (!(router.currentRoute.value.name === "login")) {
      const messages = error.response.data.errors ?? [error.response.data ?? 'An unknown error occurred']
      useNotificationStore().pushNotification(messages, true)

    }

    return Promise.reject(error)
  })

  return {api, setToken, setUniqueId}
}
