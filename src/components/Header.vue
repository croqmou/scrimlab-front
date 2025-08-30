<template>
  <header>
    <!-- mode PC -->
    <nav v-if="!isMobile">
      <h1>SCRIMLAB</h1>

      <v-tabs
        v-model="navbarItem"
        bg-color="black"
        class="nav-bar"
      >
        <v-tab value="scrims" style="margin-left: 50px" to="/" exact>SCRIMS</v-tab>
        <v-tab value="leaderboard">LEADERBOARD</v-tab>
        <v-tab value="teams" to="/teams" exact>TEAMS</v-tab>
        <v-tab value="news">POPULAR</v-tab>

      </v-tabs>

      <img class="profil-button" src="../assets/img/user.png" alt="" @click="drawer = !drawer">

      <div>
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
          <template #item="{ props }">
            <v-list-item v-bind="props">
            </v-list-item>
          </template>


          <template #selection="{ item }">
            <v-avatar size="24">
              <img :src="item.raw.flag" alt="flag" />
            </v-avatar>
          </template>
        </v-select>
      </div>



      <!-- mode mobile -->
    </nav>
    <nav v-else>
      <v-app-bar app color="black" dark>
        <img class="burger-button" src="../assets/img/burger.png" alt="" @click="drawer = !drawer">

        <v-toolbar-title class="mobile-nav-bar-text">SCRIMLAB</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-item link @click="$router.push('/')">
            <v-list-item-title >SCRIMS</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>LEADERBOARD</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/teams')">
            <v-list-item-title>TEAMS</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>POPULAR</v-list-item-title>
          </v-list-item>
        </v-list>

        <div>
          <v-select
            v-model="selectedCountry"
            :items="countries"
            item-title="code"
            item-value="code"
            return-object
            hide-details
            solo
            class="lang-select"
            style="width:250px;"
          >
            <template #item="{ props }">
              <v-list-item v-bind="props">
              </v-list-item>
            </template>


            <template #selection="{ item }">
              <v-avatar size="24">
                <img :src="item.raw.flag" alt="flag" />
              </v-avatar>
            </template>
          </v-select>
        </div>
      </v-navigation-drawer>
    </nav>
  </header>
</template>

<script setup>

import {ref, onMounted, onBeforeUnmount, computed} from 'vue'

const drawer = ref(false)

const selectedCountry = ref({ code: 'EN', flag: 'https://flagcdn.com/w40/gb.png' })

const countries = [
  { code: 'EN', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' }
]

const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 950)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})




import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute();
const navbarItem = ref(route.path.replace('/', ''));

watch(() => route.path, (newPath) => {
  navbarItem.value = newPath.replace('/', '');
});
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

header{
  width: 100%;
  background: black;
}

nav{
  display: flex;
  align-items: center;
}

h1{
  font-family: "Vermin Vibes",serif;
  font-size: 45px;
  color: white;
  position: absolute;
  margin-left: 5%;
}

.nav-bar{
  margin: 0 auto 0 auto;
  font-family: "kdam",serif;
}


.profil-button{
  width: 20px;
  cursor: pointer;
}


.lang-select{
  width: 50px;
}


.burger-button{
  width: 30px;
  position: absolute;
}


.mobile-nav-bar-text{
  font-family: "Vermin Vibes",serif;
  font-size: 45px;
  text-align: center;
}
</style>
