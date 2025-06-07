<template>
  <h1>Login</h1>
  <v-sheet class="mx-auto form-sheet" width="300">
    <v-form @submit.prevent="connexion" v-model="valid" ref="form">

          <v-text-field
            v-model="player.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>


          <v-text-field
            v-model="player.pwd"
            :rules="pwdRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePasswordVisibility"
            required
          ></v-text-field>

      <v-btn class="mt-2 submit" type="submit" :disabled="!valid" block>Login</v-btn>
      <a href="" class="mt-2" @click.prevent="$router.push('/register')" block>New player ? Create an account</a>
    </v-form>
  </v-sheet>
</template>


<script setup>

import {ref} from "vue";
import {register} from "@/services/AuthService.js"

const valid = ref(false)
const showPassword = ref(false)



const player = ref({
  email: "",
  username: "",
  pwd: "",
  pp: "unknown.png",
  admin: false,
  rankingPoints1s: 0,
  rankingPoints2s: 0,
  rankingPoints3s: 0
})


const pwdRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters',
  v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
  v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
  v => /[0-9]/.test(v) || 'Password must contain at least one number',
  v => /[\W_]/.test(v) || 'Password must contain at least one special character'
]

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]


function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}


import { useRouter } from 'vue-router'
import {login} from "@/services/AuthService.js"
const router = useRouter()

async function connexion() {
  if (valid.value) {
    //TODO Faire une vérification avec renvoie d'erreur si player non existant
    const result = await login(player.value)
    if (result.success) {
      await router.push('/') // redirection après inscription
    }
  }
}

</script>


<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/verminVibes.ttf");
}

h1{
  margin-top: 70px;
  text-align: center;
  font-family: "Vermin Vibes";
  font-size: 80px;
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px  1px 0 black,
    1px  1px 0 black;
}
</style>
