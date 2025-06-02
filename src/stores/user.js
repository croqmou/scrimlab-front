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
      localStorage.setItem('token', token)
    },
    clearAuth() {
      this.userDetails = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
