<template>
  <!-- HEADER -->
  <Header />

  <!-- MAIN CONTENT -->
  <v-main class="py-8">
    <v-container max-width="960">
      <!-- Player Info -->
      <v-row class="align-center mb-6">
        <v-col cols="12" md="6" class="d-flex align-center gap-4">
          <v-avatar size="96" class="border border-primary">
            <v-img
              :src="getPlayerPP()"
              style="background-color: grey"
            />
          </v-avatar>
          <div class="ml-5">
            <div class="text-primary text-h6 font-weight-bold">Grand Champion</div>
            <div class="text-white text-h5 font-weight-bold">{{ player.username }}</div>

          </div>
        </v-col>
      </v-row>

      <!-- Stats -->
      <v-row>
        <v-col cols="12" sm="4" v-for="stat in stats" :key="stat.label">
          <v-card class="pa-4 bg-surface border border-white/10">
            <p class="text-black text-opacity-70">{{ stat.label }}</p>
            <p class="text-black text-h6 font-weight-bold">{{ stat.value }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Teams -->
      <section class="mt-8">
        <h2 class="text-white text-h6 font-weight-bold mb-4">{{ $t('pages.player_profile.teams.title') }}</h2>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="team in teams" :key="team.name">
            <v-card class="pa-4 text-center bg-surface border border-white/10">
              <v-avatar size="64" class="mx-auto mb-3">
                <v-img :src="getLogoUrl(team.teamLogo)" />
              </v-avatar>
              <p class="text-black font-weight-semibold">{{ team.teamName }}</p>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Scrims -->
      <section class="mt-8">
        <h2 class="text-white text-h6 font-weight-bold mb-4">{{ $t('pages.player_profile.scrims.title') }}</h2>
        <v-table class="bg-surface border border-white/10">
          <thead>
          <tr class="text-black text-uppercase text-caption">
            <th>{{ $t('pages.player_profile.scrims.opponent') }}</th>
            <th>{{ $t('pages.player_profile.scrims.score') }}</th>
            <th>{{ $t('pages.player_profile.scrims.result') }}</th>
            <th>{{ $t('pages.player_profile.scrims.date') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="match in scrims"
            :key="match.opponent"
            class="hover:bg-white/5 transition"
          >
            <td class="text-black font-weight-medium">{{ match.opponent }}</td>
            <td>{{ match.score }}</td>
            <td :class="match.result === 'Victoire' ? 'text-success' : 'text-error'">
              <strong>{{ match.result }}</strong>
            </td>
            <td>{{ match.date }}</td>
          </tr>
          </tbody>
        </v-table>
      </section>

      <!-- Tournois -->
      <section class="mt-8">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-white text-h6 font-weight-bold">{{ $t('pages.player_profile.tournaments.title') }}</h2>
          <v-btn color="primary" prepend-icon="mdi-plus" class="text-white font-weight-bold" @click="openPopUp()">
            {{ $t('pages.player_profile.tournaments.add') }}
          </v-btn>
        </div>
        <v-row>
          <v-col v-if="prizesLists.length > 0" cols="12" sm="6" md="4" v-for="tournament in prizesLists" :key="tournament.name">
            <v-card class="pa-4 bg-surface border border-white/10 hover:border-primary">
              <p class="text-primary font-weight-bold">{{ tournament.prizeListName }}</p>
              <p class="text-black text-opacity-70 text-body-2">{{ tournament.tournamentDate }}</p>
              <p class="text-black font-weight-semibold">{{ $t('pages.player_profile.tournaments.result') }} : {{ tournament.result }}</p>
            </v-card>
          </v-col>
          <v-col v-else>
            <p class="text-grey mb-4">{{ $t('pages.player_profile.tournaments.no_data') }}</p>
          </v-col>
        </v-row>
      </section>
    </v-container>

  </v-main>
  <add-prize-list-pop-up
    v-model="isOpened"
    @afterLeave="closePopUp"
    @create:prizeList="createPrizeList"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import PlayerModel from '@/models/PlayerModel.js'
import Header from '@/components/Header.vue'
import router from '@/router/index.js'
import TeamsService from '@/services/TeamsService.js'
import TeamModel from '@/models/TeamModel.js'
import AddPrizeListPopUp from '@/components/popups/AddPrizeListPopUp.vue'
import PlayerService from '@/services/PlayerService.js'

const player = ref(new PlayerModel())
const prizesLists = ref({})
const isOpened = ref(false)

const stats = computed(() => [
  { label: "Goals", value: player.value.playerGoals },
  { label: "Wins", value: player.value.playerWins },
  { label: "Loses", value: player.value.playerLoses },
  { label: "1s points", value: player.value.rankingPoints1s },
  { label: "2s points", value: player.value.rankingPoints2s },
  { label: "3s points", value: player.value.rankingPoints3s },
])

const teams = ref([new TeamModel()])

const scrims = [
  { opponent: "Cosmic Guardians", score: "3 - 1", result: "Victoire", date: "2023-10-26" },
  { opponent: "Solar Flares", score: "2 - 3", result: "Défaite", date: "2023-10-24" },
  { opponent: "Void Runners", score: "4 - 0", result: "Victoire", date: "2023-10-22" },
  { opponent: "Quantum Leapers", score: "1 - 2", result: "Défaite", date: "2023-10-21" },
];


function getPlayerPP() {
  const pp = JSON.parse(localStorage.getItem("player")).pp
  return new URL(`../assets/img/players-pp/${pp}`, import.meta.url).href
}

async function getPlayer() {
  const plr = JSON.parse(localStorage.getItem("player"));

  player.value = ({
    username: plr.username,
    email: plr.email,
    pp: plr.pp,
    admin: plr.admin,
    playerGoals: plr.playerGoals,
    playerWins: plr.playerWins,
    playerLoses: plr.playerLoses,
    rankingPoints1s: plr.rankingPoints1s,
    rankingPoints2s: plr.rankingPoints2s,
    rankingPoints3s: plr.rankingPoints3s
  });
}

const getLogoUrl = (file) => {
  return new URL(`../assets/img/teams-logos/${file}`, import.meta.url).href
}

async function getAllTeams() {
  const response = await TeamsService.getAllTeamsByPlayer(player.value);

  teams.value = response.flatMap(team => ({
    teamName: team.teamName,
    teamLogo: team.teamLogo,
    teamBanner: team.teamBanner,
    rankingPoints: team.rankingPoints,
    teamGoals: team.teamGoals,
    teamWins: team.teamWins,
    teamLoses: team.teamLoses
  }));
}

function openPopUp() {
  isOpened.value = true
}

function closePopUp() {
  isOpened.value = false
}

const createPrizeList = async (prizeList) => {
  await PlayerService.createPrizeList(prizeList);
  await getAllPrizesLists();
}

async function getAllPrizesLists() {
  prizesLists.value = await PlayerService.getAllPrizesLists();
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if(!token){
    router.push("/login")
    return
  }
  await getPlayer();
  await getAllTeams();
  await getAllPrizesLists();
  console.log(prizesLists.value)
});

</script>

<style scoped>
.v-application,
.v-application__wrap,
.v-main {
  background-color: #111318 !important;
  color: black !important;
}

.bg-background {
  background-color: #111318;
  color: black;
}
.bg-surface {
  background-color: #111318;
}
.border {
  border-width: 1px;
  border-style: solid;
}
</style>
