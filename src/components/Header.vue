<template>
  <header>
    <!-- MODE PC -->
    <v-app-bar
      app
      v-if="!isMobile"
      color="#1f232c"
      elevation="1"
      class="px-8 d-flex align-center"
      height="70"
    >
      <!-- Zone gauche -->
      <div class="d-flex align-center left-zone">
        <v-icon color="primary" size="28">mdi-rocket</v-icon>
        <h1 class="header-title ml-2">SCRIMLAB</h1>
      </div>

      <!-- Zone centrale : tabs centrés -->
      <div class="center-zone">
        <v-tabs
          v-model="navbarItem"
          bg-color="transparent"
          class="nav-bar"
        >
          <v-tab value="scrims" to="/" exact>SCRIMS</v-tab>
          <v-tab value="leaderboard" to="/leaderboard">LEADERBOARD</v-tab>
          <v-tab value="teams" to="/teams" exact>TEAMS</v-tab>
          <v-tab value="news" to="/news">POPULAR</v-tab>
        </v-tabs>
      </div>

      <!-- Zone droite -->
      <div class="d-flex align-center gap-3 right-zone">
        <v-btn v-if="!userStore.token" color="primary" class="text-white font-weight-bold" @click="$router.push('/login')">
          Se connecter
        </v-btn>

        <v-avatar size="40" class="ma-3">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ggl3Nk_TTFjkgob021TFeyknN9zsRtey2F4G4jWnu2sSRwLysgsZ7r3u5Gi1P4rXYtsqyZ6bS7Ax3Jqck33Q2jonzTR8FPwg9EnkixUOyHZsqpGf5MJwqUnlP4F1HHWFD4ytTnAoUttY51YIA2zSMOz63GjTMLCEvOZs5DnOKnKg-syxUOnthavRAdLHDChDv_CN2TqcgwwZP0r-7oQQqLP6qVqS_e6h-o_AGfFN9O_9iXOTFckwX1k42yH9jQRYsDCVYzwDuw0"
          />
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
            <v-avatar size="22">
              <img :src="item.raw.flag" alt="flag" />
            </v-avatar>
          </template>
        </v-select>

        <v-avatar size="40" class="profil-button" @click="drawer = !drawer">
          <v-img src="../assets/img/user.png" />
        </v-avatar>
      </div>
    </v-app-bar>

    <!-- MODE MOBILE (inchangé) -->
    <v-app-bar v-else app color="#1f232c" dark>
      <img
        class="burger-button"
        src="../assets/img/burger.png"
        alt="menu"
        @click="drawer = !drawer"
      />
      <v-toolbar-title class="mobile-nav-bar-text">SCRIMLAB</v-toolbar-title>
    </v-app-bar>

    <!-- Drawer mobile -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="#1f232c"
      class="text-white"
    >
      <!-- contenu du drawer inchangé -->
    </v-navigation-drawer>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()

const drawer = ref(false);
const selectedCountry = ref({ code: "EN", flag: "https://flagcdn.com/w40/gb.png" });
const countries = [
  { code: "EN", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "FR", flag: "https://flagcdn.com/w40/fr.png" },
];

const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 950);
const handleResize = () => (windowWidth.value = window.innerWidth);
onMounted(() => window.addEventListener("resize", handleResize));
onBeforeUnmount(() => window.removeEventListener("resize", handleResize));

const route = useRoute();
const navbarItem = ref(route.path.replace("/", ""));
watch(
  () => route.path,
  (newPath) => (navbarItem.value = newPath.replace("/", ""))
);
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

.lang-select {
  width: 55px;
  background-color: transparent;
}

.profil-button {
  cursor: pointer;
}

.burger-button {
  width: 30px;
  position: absolute;
  left: 15px;
  cursor: pointer;
}

.mobile-nav-bar-text {
  font-family: "Vermin Vibes", serif;
  font-size: 35px;
  text-align: center;
}
</style>
