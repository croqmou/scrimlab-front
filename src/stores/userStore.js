import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: JSON.parse(localStorage.getItem('userDetails')),
  }),
  getters: {
    isAuthenticated: (state) => !!state.userDetails,
  },
  actions: {
    setUserDetails(details) {
      this.userDetails = details
      localStorage.setItem('userDetails', JSON.stringify(details))
    },
    clearUserDetails() {
      this.userDetails = null
      localStorage.removeItem('userDetails')
    },
  },

})
