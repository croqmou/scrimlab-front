<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-sheet class="form-sheet pa-4" elevation="3">
          <h1>Login</h1>
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
            <a href="" class="mt-2 d-block text-center" @click.prevent="$router.push('/register')">
              New player ? Create an account
            </a>

          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from "@/services/AuthService.js"

const router = useRouter()
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
  showPassword.value = !showPassword.value
}

async function connexion() {
  if (valid.value) {
    const result = await login(player.value)
    if (result.success) {
      await router.push('/')
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/Vermin Vibes.woff2");
}

/* Assure que l'application remplit bien tout l'écran */
.fill-height {
  height: 100%;
  margin: 0;
  background-color: black !important;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  font-family: "Vermin Vibes";
  font-size: 80px;
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
}

.v-sheet {
  background-color: white !important;
  color: black;
  border-radius: 12px;
}

a {
  color: red;
  text-decoration: underline;
}


.submit{
  background-color: black;
  color: white;
  font-size: 1.25rem;
  padding: 1.8rem;
}

</style>
