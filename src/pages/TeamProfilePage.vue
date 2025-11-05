<template>
  <v-app>
    <!-- Barre de navigation -->
    <v-app-bar app flat :color="isDark ? 'surface' : 'grey-lighten-5'" class="px-6">
      <v-toolbar-title class="d-flex align-center gap-2">
        <v-icon color="primary">mdi-rocket</v-icon>
        <span class="font-weight-bold text-white">Rocket Scrims</span>
      </v-toolbar-title>

      <v-spacer />

      <v-text-field
        v-if="$vuetify.display.mdAndUp"
        density="comfortable"
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Rechercher"
        variant="outlined"
        color="primary"
        class="mx-4"
      ></v-text-field>

      <v-btn color="primary" class="mx-2" variant="flat">Connexion</v-btn>
      <v-btn variant="outlined" class="text-white" :color="isDark ? 'white' : 'primary'">
        S'inscrire
      </v-btn>
    </v-app-bar>

    <!-- Contenu principal -->
    <v-main>
      <v-container class="py-6" fluid>
        <v-container max-width="1200">
          <!-- Bannière -->
          <v-card class="mb-8" rounded="xl" elevation="3">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRmyndKGohpJSeHVawBSwsCInTWcgpPu-5p6gJ7ZuA0jOcMcyTXEOqgSsXUCEjQ2g_R30LJJusaopAWjUgIeqjFAYfAvxV35_I0oSGPyr6EUldTyn872M4ctyp-mctkVRC16nrgSrbhAmjEgs_1FP1BSnqfWaV0_rhbAVh4vdtZJGHMHKz_btuCX3XJRs2jkqc3a2b3XgkuW8qFmjoo00yDHuisKYqg3htZK6NxoejSALV8LHM3RvKuX9gkXr1VlZpi2Qmb8KNzn0"
              height="280"
              cover
            >
              <template #default>
                <v-row
                  class="fill-height align-end pa-6"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);"
                >
                  <v-col cols="12" md="8" class="d-flex align-end gap-4">
                    <v-avatar size="96">
                      <v-img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCseEtGvRixZ2jEFk8mzb3kWl8Mh_aZpTxz7fooHTMiDdx1uKIT3zXNjdqWvE7Ae4lx3rioF9nBPZxAhDFwX5FcwuM2WaIvaVMnxCxlgCxmHUfEwZLJ-bdRC6VN2Wv2YPwK2wATpCMW-7RmOafFpWyu-6LHi4dSV-Je3VrbpVxAuctK2EYuITnyz3jVadHW7FTTTytAhjAdrhIZHl9E7nWrNbvBH5RxIUvds3Eo5--5K9hwCXjwHa6Zdi7o2UM4YIFXoCkRpPr9RM"
                        alt="Logo de l'équipe"
                      ></v-img>
                    </v-avatar>
                    <div>
                      <h2 class="text-h5 font-weight-bold text-white">Team Vortex</h2>
                      <p class="text-body-2 text-grey-lighten-1">Équipe compétitive Rocket League</p>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex justify-end align-end">
                    <v-btn variant="outlined" class="mr-3 text-white">Proposer un scrim</v-btn>
                    <v-btn color="primary" variant="flat">Suivre l'équipe</v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-img>
          </v-card>

          <!-- Grille principale -->
          <v-row dense>
            <!-- Effectif -->
            <v-col cols="12" lg="8">
              <v-card class="mb-6" rounded="xl" elevation="2">
                <v-card-title class="text-h6 font-weight-bold text-white">Effectif</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="player in players"
                      :key="player.name"
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
                          <v-img :src="player.image" :alt="player.name" cover></v-img>
                        </v-avatar>
                        <div>
                          <p class="font-weight-bold text-white">{{ player.name }}</p>
                          <p
                            class="text-caption text-uppercase font-weight-medium"
                            :class="player.role === 'Capitaine' ? 'text-primary' : 'text-grey-lighten-1'"
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
                  <span class="text-h6 font-weight-bold">Matchs récents</span>
                  <v-btn size="small" variant="text" color="primary" class="font-weight-bold">Voir tout</v-btn>
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
                        <span class="text-white font-weight-bold text-right mr-2">Team Vortex</span>
                        <v-avatar size="32">
                          <v-img :src="match.teamVortexLogo"></v-img>
                        </v-avatar>
                      </div>
                    </template>

                    <template #title>
                      <div class="text-center">
                        <div class="text-white font-weight-bold">{{ match.score }}</div>
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
                        <span class="text-white font-weight-bold ml-2">{{ match.opponent }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <!-- Statistiques -->
            <v-col cols="12" lg="4">
              <v-card rounded="xl" elevation="2" class="sticky top-4">
                <v-card-title class="text-h6 font-weight-bold text-white">Statistiques</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="stat in stats"
                      :key="stat.label"
                      cols="12"
                      class="d-flex flex-column align-center pa-4 mb-2 border"
                    >
                      <p class="text-caption text-grey-lighten-1">{{ stat.label }}</p>
                      <p
                        :class="[
                          'text-h5 font-weight-bold',
                          stat.color ? `text-${stat.color}` : 'text-white',
                        ]"
                      >
                        {{ stat.value }}
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
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDark = theme.global.name.value === 'dark'

// Données d'exemple
const players = [
  {
    name: 'Shadow',
    role: 'Capitaine',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbE6An46aEuW5exPsTr5l8QzZzWbYbe48joWvOJtqrMpLj5lcDKkrMa79IYbpPmznMbXA3T2jd3HuSzeDnzlOhRtPTvHcqQaEgCrMJbrjpIpwGWXrZ8toLUSjmGtCjmFBm4fo7eYceTELWJDt-YjmxxycjE5ZQPS39aFHp2BSjrdWXutxX8yGbrQGduVQTcueedskzt_77_b6RMffxwMCPtooe24oRSHaycJsvM4HLryzZclGK-ojKJ_Mgd44_a0hSVdA1R5zFfS0',
  },
  {
    name: 'Blaze',
    role: 'Joueur',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTkVaa85LoTRgW9mD-SoE63Oa6aLWTbKc_9SeWlDGQfrfmB33W3WTO5bcz4_O08x6-K1JLTr623k7ZlYKax6bBqIr6d1kcYLccG7UrtepecWMltSyq8M8x7Q9IykgQ7Z72siD4CC73GNjg16yJ5qpl4FkM2m4t2HBBmAUA52dtGJau-qFciIhWwuivLee6KjprRSQxIz5jjU1F4W2xImpJEfGYO-vrMSzmoyibBqV7m_6tTbzDOgbjjxON0Ke10v7lWcJc1VmHJ0g',
  },
  {
    name: 'Nova',
    role: 'Joueur',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAuOW4dWdBXm68Vbr_8SX00koYoo1sscLXhr4KrBdy900ffUysGFYnR0oltppbZSHyCVQzSd7aDszu2ge8YyAkYizKiS5ZCHY_bA2v6ILr4o31s6npRWTGL_6bWECMt6DMeNA1GUfetbkrOWxlUKr5dblql2aRewtyIHObA8CPAEesFL7vPawSknnBcG8z_UKzpDEoGrqpEfmfEk56WSDEHWWCFAIqhSzDD-j0zBNUYj7lCVH1PZu5ftEQEgKimGp7xW-7p1ZYQQFc',
  },
  {
    name: 'Apex',
    role: 'Coach',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyX--J-kryWG4pnna-cYD5g8a3ACQyNgMgJzeh9pG6XtZNtchxvAkw_VDXYtw2Ro9BLNAY5AE6Pl1gN0S5ag6EfiOxNTQdOGsb7g0qZbyayC2uHmkk_PXL2vDiV8uBtVhhfmKpSLCoa_Y0rpX79hGvFDQknVjILlAESvrY4_BJUIh8baBNGvn5YP-rhoWKfDUQR_KdpBp9NGDOfpt3YjmFeZhhF18kquXlsiuoiQs8e7ETCMPAwPjQjn6SEh34CDkLnKcL4HiegPs',
  },
]

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

const stats = [
  { label: 'Victoires', value: '24', color: 'success' },
  { label: 'Défaites', value: '8', color: 'error' },
  { label: 'Winrate', value: '75%', color: 'primary' },
  { label: 'Série actuelle', value: 'W3', color: 'success' },
  { label: 'Rang moyen', value: 'GC1', color: 'info' },
]
</script>
