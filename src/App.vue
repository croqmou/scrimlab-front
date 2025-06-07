<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
userStore.initAuthCheck()
</script>
