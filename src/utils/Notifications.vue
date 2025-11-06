<template>
  <transition name="fade">
    <v-alert
      v-if="currentMessage?.text?.length"
      :type="currentMessage.isError ? 'error' : 'success'"
      @click="clearNotification"
      dismissible
      class="show-popup"
    >
      {{ $t(currentMessage.text) }}
    </v-alert>
  </transition>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {useNotificationStore} from '@/stores/useNotificationStore.js'

const notificationStore = useNotificationStore()
const currentMessage = computed(() => notificationStore.firstNotification)

const notificationTimeout = ref()

function clearNotification() {
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value)
    notificationTimeout.value = null
  }

  notificationStore.removeFirstNotification();
}

watch(currentMessage, (newMessage) => {
  if (newMessage?.text?.length) {
    removeNotificationAfterTimeout()
  }
});

function removeNotificationAfterTimeout() {
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value)
  }

  notificationTimeout.value = setTimeout(
    clearNotification, 3000)
}

</script>

<style scoped>
.show-popup {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 15svw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
