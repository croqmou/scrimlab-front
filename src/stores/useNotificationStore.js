import {defineStore} from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),
  getters: {
    firstNotification: (state) => state.notifications[0]
  },
  actions: {
    pushNotification(messages, isError) {
      const formattedMessages = messages.map((msg) => ({text: msg, isError}))
      this.notifications.push(...formattedMessages)
    },
    removeFirstNotification() {
      this.notifications.shift();
    }
  },
})
