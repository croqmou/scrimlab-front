// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: JSON.parse(localStorage.getItem('userDetails')),
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token
      const expiry = Date.now() + 3600 * 1000 // expire dans 1 heure
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiry', expiry.toString())
    },
    clearAuth() {
      this.userDetails = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiry')
    },
    checkTokenExpiry() {
      const expiry = localStorage.getItem('tokenExpiry')
      if (expiry && Date.now() > parseInt(expiry)) {
        this.clearAuth()
      }
    },
    initAuthCheck() {
      this.checkTokenExpiry()
      setInterval(() => {
        this.checkTokenExpiry()
      }, 60 * 1000) // vérifie toutes les minutes
    }
  }
})
