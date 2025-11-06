<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <Notifications/>
    </v-main>
  </v-app>
</template>

<script setup>
import Notifications from "@/utils/Notifications.vue";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
userStore.initAuthCheck()
</script>
