<template>
  <v-app>
    <!-- Barre de navigation -->
    <Header/>

    <!-- Contenu principal -->
    <v-main>
      <v-container class="py-6" fluid>
        <v-container max-width="1200">
          <!-- Bannière -->
          <v-card class="mb-8" rounded="xl" elevation="3">
            <v-img
              :src="getBannerUrl(team.teamBanner)"
              height="280"
              cover
            >
              <template #default>
                <v-row
                  class="fill-height align-end pa-6"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);"
                >
                  <v-col cols="12" md="8" class="d-flex align-end gap-4">
                    <v-avatar size="96" class="mr-5">
                      <v-img
                        :src="getLogoUrl(team.teamLogo)"
                        alt="Logo de l'équipe"
                      ></v-img>
                    </v-avatar>
                    <div>
                      <h2 class="text-h5 font-weight-bold text-white">{{ team.teamName }}</h2>
                      <p class="text-body-2 text-grey-lighten-1">{{ team.teamDescription }}</p>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex justify-end align-end">
                    <v-btn color="primary" variant="flat">{{ $t('pages.team_profile.propose_scrim') }}</v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-img>
          </v-card>

          <v-row dense>
            <v-col cols="12" lg="8">
              <v-card class="mb-6" rounded="xl" elevation="2">
                <v-card-title class="text-h6 font-weight-bold text-black">{{ $t('pages.team_profile.roster') }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="player in players"
                      :key="player.infos.email"
                      cols="12"
                      sm="6"
                      md="4"
                      class="d-flex justify-center"
                    >
                      <v-card
                        rounded="lg"
                        elevation="1"
                        class="pa-4 text-center bg-background-dark"
                      >
                        <v-avatar size="80" class="mb-3">
                          <v-img :src="getPlayerPP(player.infos.pp)" :alt="player.infos.username" cover></v-img>
                        </v-avatar>
                        <div>
                          <p class="font-weight-bold text-black">{{ player.infos.username }}</p>
                          <p
                            class="text-caption text-uppercase font-weight-medium text-primary"
                          >
                            {{ player.role }}
                          </p>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Matchs récents -->
              <v-card rounded="xl" elevation="2">
                <v-card-title class="d-flex justify-space-between align-center text-white">
                  <span class="text-h6 font-weight-bold text-black">{{ $t('pages.team_profile.recent_matches') }}</span>
                  <v-btn size="small" variant="text" color="primary" class="font-weight-bold">{{ $t('pages.team_profile.see_all') }}</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list lines="one">
                  <v-list-item
                    v-for="match in matches"
                    :key="match.id"
                    class="hover:bg-surface"
                  >
                    <template #prepend>
                      <div class="d-flex align-center justify-end mr-4">
                        <span class="text-black font-weight-bold text-right mr-2">Team Vortex</span>
                        <v-avatar size="32">
                          <v-img :src="match.teamVortexLogo"></v-img>
                        </v-avatar>
                      </div>
                    </template>

                    <template #title>
                      <div class="text-center">
                        <div class="text-black font-weight-bold">{{ match.score }}</div>
                        <v-chip
                          size="small"
                          :color="match.result === 'VICTOIRE' ? 'success' : 'error'"
                          variant="tonal"
                        >
                          {{ match.result }}
                        </v-chip>
                      </div>
                    </template>

                    <template #append>
                      <div class="d-flex align-center ml-4">
                        <v-avatar size="32">
                          <v-img :src="match.opponentLogo"></v-img>
                        </v-avatar>
                        <span class="text-black font-weight-bold ml-2">{{ match.opponent }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <!-- Statistiques -->
            <v-col cols="12" lg="4">
              <v-card rounded="xl" elevation="2" class="sticky top-4">
                <v-card-title class="text-h6 font-weight-bold text-black">{{ $t('pages.team_profile.statistics') }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      class="d-flex flex-column align-center pa-4 mb-2 border"
                    >
                      <p class="text-caption text-grey-lighten-1">{{ $t('pages.team_profile.ranking_points') }}</p>
                      <p
                        class="text-h5 font-weight-bold text-warning"
                      >
                        {{ team.rankingPoints }}
                      </p>
                    </v-col>
                    <v-col
                      cols="12"
                      class="d-flex flex-column align-center pa-4 mb-2 border"
                    >
                      <p class="text-caption text-grey-lighten-1">{{ $t('pages.team_profile.victories') }}</p>
                      <p
                        class="text-h5 font-weight-bold text-success"
                      >
                        {{ team.teamGoals }}
                      </p>
                    </v-col>
                    <v-col
                      cols="12"
                      class="d-flex flex-column align-center pa-4 mb-2 border"
                    >
                      <p class="text-caption text-grey-lighten-1">{{ $t('pages.team_profile.loses') }}</p>
                      <p
                        class="text-h5 font-weight-bold text-error"
                      >
                        {{ team.teamLoses }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TeamsService from '@/services/TeamsService.js'
import { getLogoUrl, getBannerUrl, getPlayerPP } from '@/utils/ImageUrl.js'
import {useI18n} from "vue-i18n";


const {t, locale} = useI18n()

const route = useRoute()

const team = ref({})


const players = ref([])

const matches = [
  {
    id: 1,
    score: '3 - 1',
    result: 'VICTOIRE',
    opponent: 'Solar Flares',
    teamVortexLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvLljJKk4QcjjsLgXWw-S6xwd2MXPiE3PTt2xAVSdrWiYY7zNm-kiCMuELxi_n3e5fXXeH0wxZ0R1NFwjaOSUonEVQp9soAKhh-O8MHjz5dTDb4JCOt-vqSuN_PoBeIZoMvMUrgZvmgUY4yLq5jT5FNi74KTPGkg1FBw1uLBXCdt2-Qea1J8AbkE3E8lKvAcyRojd2my9tckxiv-se3petfyzPWhrtBtIEfEywv9nKP2RYQNpBLpbKuCnW_kZm0Jrov9rh_27TUUk',
    opponentLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlY51FtqKCOuh8Iw0hipVX8s3lN-VcmCXU3dBaubuau-dH9bdsIxAqsqh4VqPRQXdlvPWECQiyda_d4YiN5pUHbPhIi8D3oy6au8r43CnMu-I2R2rffk5PSzFgFSAA2wTku2Sl2iTM2blGwKTfyUDFgqTnok-U7fyY6qjPokS95RQO2PYTHnHSPSOze73xgL9YxYOh6E4zdGxsExp599SQRIdlvZN6PaOpiiiRoAL56csu2KoALS292nwYobAU1ajP8NXtHhi2ZyU',
  },
  {
    id: 2,
    score: '2 - 4',
    result: 'DÉFAITE',
    opponent: 'Nebula Esports',
    teamVortexLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA778_26MInwC7y2GnoYwPVkpOPSRxrOFGSE8_H1lxAkKCJ_kWsDNb19zjDFhDnofnNrmYyUzYJgbaDa_liVtVtPxvRwJHES__NwCMtBrnQcYSWWtELdYHG-ri9kAP4sjrurP_w4a10HzVGQnPHdzmEZ4AzO9gzOqd5JyQAPbMMa815Nsyb4abq1MDeDkpexXoUagnc5j7zdK9jq4uGmOMXz8bhm1-pdvl4jd1dRQNI0g1Sz4xe2EaBNGL0fZ-dzFk35scwEzgbtsk',
    opponentLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvDD0J5tQSuKI6xtvwzf6y5769X5MQ507hZzwBwgqxyiif_MemfX3AkxU-3pAm7ntP_UP9seLOVYHBvHa8Aux35wJlkFkCNWzXq-jADBVdR08BAU9lnvpDbMk4ULoY5oHnxngWuqofHDWDORw7BXbHgwzBontVCQSRTz0GiqgKQ3q3jjgb7vP8A-waCvamIDYQkZ-q_Rf1r_ZX1_TpWsWmvwFPrwk7OLLSy5X10cTOTaAQoZtbkGEmcPROwtUjduWifu9_OqvlfW0',
  },
  {
    id: 3,
    score: '5 - 0',
    result: 'VICTOIRE',
    opponent: 'Crimson Fury',
    teamVortexLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Jo40BXsq-RS2KzIhAOsPD10nkuPP0J02zCai9cm9l6kx7LofUDDP-87vW0y0UwsU_IkRt9n_h3_5Io1oAJZMHkKLHsuLiNy8eWQMp5MkHidpoLhy99uvhdnaWCcgcIDfXGnlxZD2hoOjP6R73nFDbPQ9VwldKUwo2tt_9m2E9CFcgZagO69MVXdSQeOJ45ZZCwNBkCRj2Ar1FiTFVadpce43HwRLCnHRrLhXOMjae-oXrpL-riXBwcUjBXJ086bbXB0IQIKvVzQ',
    opponentLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjg6du9OBUuhdDapJaLVsoY7HnoP-rRQgN8fpJZTITR4O07YtR1tOuxtxXPWyeMaHnP3xJ4xJsf6lXHzjOudlHSkpN0KfXQqHzoEpWQn1MbsfILByUZtw5qImXkhdZ5U1mDJEm1Yr8G4dWMTxdTKJbdTi4ScZ8X4a33JWr4AFMjOdF5sN6gcMN5dCD7WAC8k3JQuScmUTKmA1et5bZbYpczUTq8oK8LfgivvDNFBDPZXcnhlj1U_9xwCGQkPNJ3wP6eyXYNjj2uGA',
  },
]

function getAllPlayers(team){
  if(team.captain !== null) players.value.push({ infos: team.captain, role: t('pages.team_profile.captain') })
  if(team.playerEntityTwo !== null) players.value.push({ infos: team.playerEntityTwo, role: t('pages.team_profile.player') })
  if(team.playerEntityThree !== null) players.value.push({ infos: team.playerEntityThree, role: t('pages.team_profile.player') })
  if(team.sub !== null) players.value.push({ infos: team.sub, role: t('pages.team_profile.sub') })
  if(team.secondSub !== null) players.value.push({ infos: team.secondSub, role: t('pages.team_profile.sub') })
  if(team.coach !== null) players.value.push({ infos: team.coach, role: t('pages.team_profile.coach') })
  if(team.manager !== null) players.value.push({ infos: team.manager, role: t('pages.team_profile.manager') })
}

async function getTeam(){
  const teamName = route.params.teamName;
  team.value = await TeamsService.getTeamByTeamName(teamName);
  await getAllPlayers(team.value);
}

watch(locale, (newLocale, oldLocale) => {
  players.value = []
  getAllPlayers(team.value);
})

onMounted(() => {
  getTeam()
})

</script>
<style scoped>
.v-application,
.v-application__wrap,
.v-main {
  background-color: #111318 !important;
  color: white !important;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

:deep(input[type="date"]::-webkit-calendar-picker-indicator),
:deep(input[type="time"]::-webkit-calendar-picker-indicator),
:deep(input[type="datetime-local"]::-webkit-calendar-picker-indicator) {
  filter: invert(1);
  cursor: pointer;
}
</style>
