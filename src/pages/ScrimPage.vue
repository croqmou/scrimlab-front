<template>
  <Header />
  <v-app>
    <v-main>

      <v-container class="py-10">
        <!-- Hero section -->
        <div class="mb-8">
          <h1 class="text-h3 font-weight-black mb-2">
            Trouvez votre prochain Scrim
          </h1>
          <p class="text-body-1 text-white text-opacity-70">
            Parcourez, filtrez et postulez aux matchs d'entraînement qui
            correspondent au niveau et au format de votre équipe.
          </p>
        </div>

        <!-- Create scrim -->
        <v-card class="pa-6 mb-10" color="surface" variant="outlined">
          <h2 class="text-h5 font-weight-bold mb-4">Créer un nouveau Scrim</h2>

          <v-form>
            <v-row dense>
              <v-col cols="12" md="6" lg="3">
                <v-select
                  label="Équipe organisatrice"
                  :items="teams"
                  variant="outlined"
                  color="primary"
                />
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <v-text-field
                  label="Date"
                  type="date"
                  variant="outlined"
                  color="primary"
                />
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <v-text-field
                  label="Heure"
                  type="time"
                  variant="outlined"
                  color="primary"
                />
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <v-select
                  label="Format (Best Of)"
                  :items="['BO3', 'BO5', 'BO7']"
                  variant="outlined"
                  color="primary"
                />
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <v-select
                  label="Niveau requis"
                  :items="levels"
                  variant="outlined"
                  color="primary"
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="primary" prepend-icon="mdi-plus" rounded>
                  Créer le Scrim
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <!-- Main layout -->
        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" lg="3">
            <h3 class="text-h6 font-weight-bold mb-3">Filtres</h3>

            <v-text-field
              prepend-inner-icon="mdi-magnify"
              label="Rechercher par nom..."
              variant="outlined"
              color="primary"
              density="comfortable"
            />

            <h4 class="text-subtitle-2 font-weight-medium mt-6 mb-2">
              Trier par
            </h4>
            <v-btn-toggle
              v-model="sort"
              color="primary"
              divided
              rounded="lg"
              density="compact"
            >
              <v-btn value="date" prepend-icon="mdi-arrow-down">Date</v-btn>
              <v-btn value="niveau">Niveau</v-btn>
            </v-btn-toggle>

            <h4 class="text-subtitle-2 font-weight-medium mt-6 mb-2">
              Format (BO)
            </h4>
            <v-chip-group v-model="selectedFormat" color="primary" variant="outlined">
              <v-chip value="tous">Tous</v-chip>
              <v-chip value="bo3">BO3</v-chip>
              <v-chip value="bo5">BO5</v-chip>
              <v-chip value="bo7">BO7</v-chip>
            </v-chip-group>

            <h4 class="text-subtitle-2 font-weight-medium mt-6 mb-2">
              Niveau (MMR)
            </h4>
            <v-range-slider
              v-model="mmrRange"
              color="primary"
              min="1000"
              max="2200"
              step="50"
              thumb-label
            />
            <div class="d-flex justify-space-between text-caption text-white text-opacity-60">
              <span>Champ 1</span>
              <span>SSL</span>
            </div>
          </v-col>

          <!-- Scrim cards -->
          <v-col cols="12" lg="9">
            <v-row dense>
              <v-col v-for="scrim in scrims" :key="scrim.id" cols="12">
                <v-card
                  color="surface"
                  variant="outlined"
                  class="pa-4"
                  :class="scrim.disabled ? 'opacity-50' : ''"
                >
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" sm="6" class="d-flex align-center gap-4">
                      <v-avatar size="64" rounded>
                        <v-img :src="scrim.logo" />
                      </v-avatar>
                      <div>
                        <p class="text-h6 font-weight-bold">{{ scrim.title }}</p>
                        <p class="text-body-2 text-white text-opacity-60">
                          {{ scrim.date }}
                        </p>
                      </div>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      class="d-flex align-center justify-end flex-wrap gap-2"
                    >
                      <v-chip color="primary" variant="outlined" prepend-icon="mdi-star">
                        {{ scrim.rank }}
                      </v-chip>
                      <v-chip variant="tonal" color="grey-lighten-1" prepend-icon="mdi-trophy">
                        {{ scrim.format }}
                      </v-chip>

                      <v-btn
                        v-if="!scrim.disabled"
                        color="primary"
                        rounded
                        text="Voir Détails"
                      />
                      <v-btn
                        v-else
                        disabled
                        color="grey"
                        rounded
                        text="Complet"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <div class="d-flex justify-center align-center mt-8">
              <v-pagination v-model="page" length="8" color="primary" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'

const teams = ['Team Solaris', 'Vitality Academy', 'KCORP']
const levels = ['Champion 1+', 'Champion 2+', 'Champion 3+', 'GC1+', 'GC2+', 'GC3+', 'SSL']

const sort = ref('date')
const selectedFormat = ref('bo5')
const mmrRange = ref([1400, 2000])
const page = ref(1)

const scrims = ref([
  {
    id: 1,
    title: 'Team Solaris cherche Scrim',
    date: "AUJOURD'HUI À 21:00",
    rank: 'GC1+',
    format: 'BO5',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr3urM0x5AvnH74GzL0vIAja1RVXMocwJjk7E2VcaDz4XsKn9t2Z9l9NJiwWli6zknbDC3R823haoWKdfDZ9o-FfhXXLT43uEbN1itD3U8VmDKBOceDF_9dYNuwWsYFymPKU_my31eByuvKuWxClRIB9iF9Q6SriIfUz8KfDbm_6Ydt4hL7gSXI7otdV2acbSkpoVSckUaqFzA1VfVeLZDl9xbdwCogTuowWbsTiwUTd7wRV0tytpoduJfUX-OY-sqXe5mWWS_ykE',
  },
  {
    id: 2,
    title: 'Vitality Academy cherche BO7',
    date: 'DEMAIN À 19:30',
    rank: 'GC3+',
    format: 'BO7',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBY0hllMcf6eylUAgW4wAcygb25qT4PsSiG28vVxKv5_Dj_9QQr9N9io7SgO9roTFyYajRB6HxEVFVtRownnoUBCtpKnZPYSVJrmyrJM7uvJPOSjjaqHvpUKFprf2ZGhjXtKxvWMPirwY_0QQ97bcZ6ItuAzEhj6uC4RIYpAG1-MWjOQbGEki24Mu8vgAVI08XWLcyFzYLb-BkD02t-VMNbAO--pPCQNGVNA5UzdouekHMPKt72DNaJU79-tZ8LWUZhHcA1PnwMwU',
  },
  {
    id: 3,
    title: 'KCORP cherche Scrim',
    date: 'HIER À 20:00',
    rank: 'SSL',
    format: 'BO5',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_1kwr2Qt0kanbyFG4cRXuocwMBBk6C2nZ2dqsN5Eu4lnF0T-YXt41EuNQkGcBnKnXMs8ZkS-VqigpO6H9L5HsBBWbU0x20K3Xod1LNRd3Wi943t7tnlwz3fpc52i-6lKB9oFeOTTs0DaS-wkUsz2uB-tLh87EmDiuAO01bopFNpGkPEL118JJ7dkeq5IWk6mWIYvSoOLpO5_UV3OpKiXwBK5QDYWTK97HnOkPAm7QMVOoL3W-XHl9IW6FLoTAap3hCLlhvTUuzow',
    disabled: true,
  },
  {
    id: 4,
    title: 'Rocket Baguette cherche Scrim',
    date: '25/12/2024 À 16:00',
    rank: 'Champ 2+',
    format: 'BO5',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIBJhoqGAwnbJR111Gq3YQuN5ubXP22AMlmmLz_2wcAfXJSeTVHepFoe8FDTX3rLgK6IwKInk_yA_P34Vpa8Sm53pTE7tTru4gUxsY82qK4hGsj9_eQL2gXfctlw-Kbd8x58OBt1aZ_r-E0l0dOQGFu4qSLbEeOp-iX-B0a7XwPEg3uykxG8kX5aIRAENtHT6mDW7AFowNCSQfOzkrlbd7mc3EAAIU_dYSA-ZSsxce2EkAlPJH8U4D4uEifcXQsergICp5qSXvI_o',
  },
])
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
