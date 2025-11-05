<template>
  <v-container class="fill-height login-container" fluid>
    <!-- Image de fond -->
    <v-img
      src="https://images.unsplash.com/photo-1549499238-04f762d04a79?q=80&w=2940&auto=format&fit=crop"
      class="background-image"
      cover
    ></v-img>

    <v-row align="center" justify="center" class="z-10">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center mb-8">
          <v-icon color="primary" size="40">mdi-trophy-outline</v-icon>
          <span class="app-title">{{ $t('pages.login.title') }}</span>
        </div>

        <v-card class="login-card pa-8 text-center" elevation="12">
          <h1 class="text-h4 font-weight-bold mb-2 text-white">{{ $t('pages.login.welcome') }}</h1>
          <p class="text-grey-lighten-1 mb-6">{{ $t('pages.login.description') }}</p>

          <v-form @submit.prevent="connexion" v-model="valid" ref="form">
            <!-- Email -->
            <v-text-field
              v-model="player.email"
              :rules="emailRules"
              :label="$t('pages.login.email')"
              type="email"
              variant="outlined"
              density="comfortable"
              bg-color="#2A2F3A"
              required
            ></v-text-field>

            <!-- Password -->
            <v-text-field
              v-model="player.pwd"
              :rules="pwdRules"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('pages.login.password')"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePasswordVisibility"
              variant="outlined"
              density="comfortable"
              bg-color="#2A2F3A"
              required
            ></v-text-field>

            <!-- Button -->
            <v-btn
              class="mt-4 login-btn"
              type="submit"
              :disabled="!valid"
              block
            >
              {{ $t('pages.login.login_text') }}
            </v-btn>

            <p class="mt-4 text-grey-lighten-1 text-body-2">
              {{ $t('pages.login.new_player') }}
              <a
                href=""
                class="text-primary"
                @click.prevent="$router.push('/register')"
              >
                {{ $t('pages.login.create_account') }}
              </a>
            </p>
          </v-form>
        </v-card>
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
.login-container {
  position: relative;
  min-height: 100vh;
  background-color: #0D1117;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 0;
}

.z-10 {
  position: relative;
  z-index: 10;
}

.app-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-left: 10px;
  vertical-align: middle;
}

.login-card {
  background-color: rgba(0, 0, 0, 0.45) !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  border-radius: 20px;
}



.login-btn {
  background-color: #4343F0 !important;
  color: #0D1117 !important;
  font-weight: bold;
  padding: 1rem;
  border-radius: 10px;
  transition: 0.2s;
}
.login-btn:hover {
  background-color: #5DDCFF !important;
  transform: scale(1.02);
}
.login-btn:active {
  transform: scale(0.98);
}

a {
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  text-decoration: none;
}
</style>
