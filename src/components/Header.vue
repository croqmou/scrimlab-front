<template>
  <header>
    <!-- APP BAR -->
    <v-app-bar app color="#1f232c" elevation="1">
      <!-- DESKTOP -->
      <template v-if="!isMobile">
        <div class="d-flex align-center left-zone">
          <v-icon color="primary" size="28">mdi-rocket</v-icon>
          <h1 class="header-title ml-2">{{ $t('layouts.default.header.title') }}</h1>
        </div>

        <div class="center-zone">
          <v-tabs v-model="navbarItem" bg-color="transparent" class="nav-bar">
            <v-tab value="scrims" to="/" exact>{{ $t('layouts.default.header.navigator.scrims.title') }}</v-tab>
            <v-tab value="leaderboard" to="/leaderboard">{{ $t('layouts.default.header.navigator.leaderboard.title') }}</v-tab>
            <v-tab value="teams" to="/teams" exact>{{ $t('layouts.default.header.navigator.teams.title') }}</v-tab>
            <v-tab value="news" to="/news">{{ $t('layouts.default.header.navigator.popular.title') }}</v-tab>
          </v-tabs>
        </div>

        <div class="d-flex align-center gap-3 right-zone">
          <v-btn
            :color="userStore.token ? 'red' : 'primary'"
            class="text-white font-weight-bold"
            @click="logout"
          >
            {{ userStore.token ? $t('layouts.default.header.logout') : $t('layouts.default.header.login') }}
          </v-btn>

          <v-avatar size="40" class="ma-3">
            <v-img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ggl3Nk_TTFjkgob021TFeyknN9zsRtey2F4G4jWnu2sSRwLysgsZ7r3u5Gi1P4rXYtsqyZ6bS7Ax3Jqck33Q2jonzTR8FPwg9EnkixUOyHZsqpGf5MJwqUnlP4F1HHWFD4ytTnAoUttY51YIA2zSMOz63GjTMLCEvOZs5DnOKnKg-syxUOnthavRAdLHDChDv_CN2TqcgwwZP0r-7oQQqLP6qVqS_e6h-o_AGfFN9O_9iXOTFckwX1k42yH9jQRYsDCVYzwDuw0" />
          </v-avatar>

          <v-select
            v-model="selectedCountry"
            :items="countries"
            item-title="code"
            item-value="code"
            return-object
            hide-details
            solo
            class="lang-select"
          >
            <template #selection="{ item }">
              <v-avatar size="22" class="mr-2">
                <img :src="item.raw.flag" alt="flag" />
              </v-avatar>
              <span>{{ item.code }}</span>
            </template>
          </v-select>

          <v-avatar size="40" class="profil-button" @click="drawer = !drawer">
            <v-img src="../assets/img/user.png" />
          </v-avatar>
        </div>
      </template>

      <!-- MOBILE -->
      <template v-else>
        <img class="burger-button" src="../assets/img/burger.png" alt="menu" @click="drawer = !drawer" />
        <v-toolbar-title class="mobile-nav-bar-text">{{ $t('layouts.default.header.title') }}</v-toolbar-title>
      </template>
    </v-app-bar>

    <!-- DRAWER MOBILE -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="#1f232c"
      class="text-white"
    >
      <v-list dense class="mobile-nav">
        <!-- NAV LINKS -->
        <v-list-item link to="/">
          <v-list-item-title class="mobile-nav-item">{{ $t('layouts.default.header.navigator.scrims.title') }}</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/leaderboard">
          <v-list-item-title class="mobile-nav-item">{{ $t('layouts.default.header.navigator.leaderboard.title') }}</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/teams">
          <v-list-item-title class="mobile-nav-item">{{ $t('layouts.default.header.navigator.teams.title') }}</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/news">
          <v-list-item-title class="mobile-nav-item">{{ $t('layouts.default.header.navigator.popular.title') }}</v-list-item-title>
        </v-list-item>

        <!-- LOGIN BUTTON -->
        <v-list-item class="mt-4">
          <v-btn :color="userStore.token ? 'red' : 'primary'" class="text-white font-weight-bold" block @click="logout">
            {{ userStore.token ? $t('layouts.default.header.logout') : $t('layouts.default.header.login') }}
          </v-btn>
        </v-list-item>

        <!-- LANG SELECT -->
        <v-list-item class="mt-4">
          <v-select
            v-model="selectedCountry"
            :items="countries"
            item-title="code"
            item-value="code"
            return-object
            hide-details
            outlined
            dense
            class="mobile-lang-select"
          >
            <template #selection="{ item }">
              <v-avatar size="22" class="mr-2">
                <img :src="item.raw.flag" alt="flag" />
              </v-avatar>
              <span>{{ item.code }}</span>
            </template>
          </v-select>
        </v-list-item>

        <!-- PROFIL AVATAR -->
        <v-list-item class="mt-4">
          <v-avatar size="40" class="profil-button" @click="drawer = false">
            <v-img src="../assets/img/user.png" />
          </v-avatar>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import { useUserStore } from "@/stores/user.js";
import router from '@/router/index.js'
import {authLogout} from "@/services/AuthService.js";


const userStore = useUserStore();

const { locale } = useI18n()  // 'locale' est réactif


const drawer = ref(false);
const selectedCountry = ref({ code: locale.value, flag: locale.value === 'EN' ? 'https://flagcdn.com/w40/gb.png' : 'https://flagcdn.com/w40/fr.png' })
const countries = [
  { code: "EN", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "FR", flag: "https://flagcdn.com/w40/fr.png" },
];

const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value <= 950);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (!isMobile.value) drawer.value = false; // fermer drawer si on repasse en desktop
};

onMounted(() => {
  // Définir le drapeau correspondant à la locale au chargement
  const lang = locale.value.toUpperCase();
  const country = countries.find(c => c.code === lang) || countries[0];
  selectedCountry.value = { ...country };
  locale.value = country.code.toLowerCase();

  window.addEventListener("resize", handleResize);
  handleResize();
});


function logout(){
  if(userStore.token){
    authLogout()
    userStore.clearAuth()
  }
  router.push("/login")
}

onBeforeUnmount(() => window.removeEventListener("resize", handleResize));

const route = useRoute();
const navbarItem = ref(route.path.replace("/", ""));
watch(() => route.path, (newPath) => (navbarItem.value = newPath.replace("/", "")));

watch(selectedCountry, (newVal) => {
  locale.value = newVal.code.toLowerCase() // change la langue i18n
  Cookies.set('locale', newVal.code.toLowerCase(), { expires: 365 }) // sauvegarde dans cookie 1 an
})
</script>

<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/Vermin Vibes.woff2");
}
@font-face {
  font-family: "kdam";
  src: url("../assets/fonts/KdamThmorPro-Regular.ttf");
}

header {
  width: 100%;
  background: #1f232c;
  position: relative;
}

/* HEADER DESKTOP */
.header-title {
  font-family: "Vermin Vibes", serif;
  font-size: 28px;
  color: white;
}

.nav-bar {
  font-family: "kdam", serif;
  color: white;
  display: flex;
  justify-content: center;
}

.left-zone {
  flex: 0 0 auto;
}

.right-zone {
  flex: 0 0 auto;
  margin-left: auto;
}

.center-zone {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

/* LANG SELECT */
.lang-select,
.mobile-lang-select {
  width: 100%;
  background-color: transparent;
}

/* PROFIL AVATAR */
.profil-button {
  cursor: pointer;
}

/* BURGER BUTTON */
.burger-button {
  width: 30px;
  position: absolute;
  left: 15px;
  cursor: pointer;
}

/* MOBILE NAVBAR TEXT */
.mobile-nav-bar-text {
  font-family: "Vermin Vibes", serif;
  font-size: 35px;
  text-align: center;
}

/* MOBILE DRAWER */
.mobile-nav {
  font-family: "kdam", serif;
  padding: 1rem;
}

.mobile-nav-item {
  font-family: "kdam", serif;
  padding: 0.75rem 0;
  font-size: 18px;
  color: white;
}

.v-list-item {
  padding: 0.25rem 0 !important;
}
</style>
