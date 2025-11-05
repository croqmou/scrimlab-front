<template>
  <!-- HEADER -->
  <Header />

  <v-app class="bg-dark">

    <v-spacer></v-spacer>
    <!-- MAIN CONTENT -->
    <v-main class="pa-8">
      <div class="text-center mb-10">
        <h1 class="text-h4 font-weight-black text-white">Explorer les Équipes</h1>
        <p class="text-white text-opacity-70">
          Trouvez et défiez les meilleures équipes de Rocket League.
        </p>
      </div>

      <!-- Barre de recherche et filtres -->
      <v-container class="d-flex justify-center">
        <div class="d-flex flex-column flex-md-row gap-4 mb-8">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher une équipe par nom..."
            variant="outlined"
            color="primary"
            class="search-bar"
            hide-details
            bg-color="white"
            density="compact"
          />
          <div class="d-flex justify-center flex-wrap gap-3">
            <v-btn variant="outlined" color="primary" prepend-icon="mdi-trophy">Points</v-btn>
            <v-btn variant="outlined" color="primary" prepend-icon="mdi-check">Victoires</v-btn>
            <v-btn variant="outlined" color="primary" prepend-icon="mdi-earth">Région</v-btn>
          </div>
        </div>
      </v-container>

      <!-- GRID DES ÉQUIPES -->
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(team, i) in teams"
            :key="i"
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card class="bg-[#1f232c] text-white hover:scale-105 transition-all duration-300">
              <v-img :src="getLogoUrl(team.teamLogo)" height="150px" cover></v-img>
              <div class="d-flex justify-center mt-n10">
                <v-avatar size="120" class="elevation-4 border border-dark">
                  <v-img :src="getLogoUrl(team.teamLogo)" />
                </v-avatar>
              </div>

              <v-card-text class="text-center mt-6">
                <h3 class="text-h6 font-weight-bold text-black" style="margin-top: -25px; margin-bottom: 15px">{{ team.teamName }}</h3>
                <v-row dense class="mt-4 text-white text-opacity-80">
                  <v-col cols="6" class="d-flex align-center justify-center">
                    <v-icon color="primary" size="18">mdi-trophy</v-icon>
                    <span class="ml-1 text-black">{{ team.rankingPoints }} PTS</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-center">
                    <v-icon color="primary" size="18">mdi-soccer</v-icon>
                    <span class="ml-1 text-black">{{ team.teamGoals }} Buts</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-center">
                    <v-icon color="green" size="18">mdi-thumb-up</v-icon>
                    <span class="ml-1 text-black">{{ team.teamWins }} V</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-center">
                    <v-icon color="red" size="18">mdi-thumb-down</v-icon>
                    <span class="ml-1 text-black">{{ team.teamLoses }} D</span>
                  </v-col>
                </v-row>

                <v-btn
                  variant="outlined"
                  color="primary"
                  block
                  class="mt-4 font-weight-bold"
                >
                  Voir le profil
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- BOUTON CHARGER PLUS -->
      <div class="text-center mt-10">
        <v-btn color="primary" class="text-white font-weight-bold px-8 py-3">
          Charger plus d'équipes
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>

import TeamModel from "@/models/TeamModel.js";
import {getAllTeamsRequest} from "@/services/TeamsService.js";
import {onMounted, ref, watch} from "vue";
import Header from '@/components/Header.vue'

const sortBy = ref("teamName")   // par défaut on trie par teamName
const sortDir = ref("asc")

const options = ref({
  page:1,
  itemsPerPage:2,
  sortBy: sortBy.value,
  sortDir: sortDir.value
})

watch([sortBy, sortDir], () => {
  options.value.sortBy = sortBy.value
  options.value.sortDir = sortDir.value
  loadTeams()
})


const teams = ref([new TeamModel()])

async function getAllTeams() {
  const response = await getAllTeamsRequest(options.value);

  teams.value = response.content.flatMap(team => ({
    teamName: team.teamName,
    teamLogo: team.teamLogo,
    rankingPoints: team.rankingPoints,
    teamGoals: team.teamGoals,
    teamWins: team.teamWins,
    teamLoses: team.teamLoses
  }));
}

const getLogoUrl = (file) => {
  return new URL(`../assets/img/teams-logos/${file}`, import.meta.url).href
}

onMounted(() => {
  getAllTeams()
})



async function loadTeams() {
  try {
    options.value.sortBy = sortBy.value
    options.value.sortDir = sortDir.value
    await getAllTeams()
  } catch (error) {
    console.error("Loading error :", error)
  }
}

</script>

<style scoped>

.search-bar{
  width: 400px;
}

.bg-dark {
  background-color: #111318;
  min-height: 100vh;
}
.text-opacity-70 {
  opacity: 0.7;
}
.gap-4 {
  gap: 1rem;
}
.gap-3 {
  gap: 0.75rem;
}
</style>
