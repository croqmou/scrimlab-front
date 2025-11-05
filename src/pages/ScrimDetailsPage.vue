<template>
  <v-app>
    <!-- HEADER -->
    <v-app-bar app color="surface" elevation="1" class="px-6" density="comfortable">
      <v-row align="center" no-gutters class="flex-nowrap">
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="primary" size="28">mdi-shield</v-icon>
          <v-toolbar-title class="text-white font-weight-bold ml-2">ScrimFinder</v-toolbar-title>
        </v-col>

        <v-spacer />

        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn text class="text-white text-caption mx-2">Accueil</v-btn>
          <v-btn text class="text-white text-caption mx-2">Trouver un Scrim</v-btn>
          <v-btn text class="text-white text-caption mx-2">Mes Équipes</v-btn>
          <v-btn text class="text-white text-caption mx-2">Classements</v-btn>
        </v-col>

        <v-btn color="primary" class="ml-4">Créer un Scrim</v-btn>

        <v-avatar size="40" class="ml-4">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ddaUcjCCRFOGkwQdJUCYBiay4J5Tkd6Mo42wZdMfykzdpBChuO4q7IFJ2SOOIaRN-gNYWkXQonS4tK1S5a40l7BWXrlk8xAkVfyzHo9s2Mbjz7Jt4jDkQkQ7D8u5CV0y-VmsCM7r2w96S5mIy9CCSNuwQt27cHB6cAU5v3VRwmbM29HoEL_8DodJ0qFCI43RBko05O4GMgjqocr8pwj0J6Ty2tX20NwxAFlko6KPnRTH2AiC_BUvbQ81I-z8-nGEczPM-KD1HUg"
          />
        </v-avatar>
      </v-row>
    </v-app-bar>

    <!-- MAIN -->
    <v-main class="bg-background pa-6">
      <v-container class="py-8" max-width="lg">
        <!-- MATCH INFO -->
        <v-card color="surface" class="pa-6 mb-8" variant="outlined">
          <v-row>
            <v-col cols="12">
              <h1 class="text-white text-h4 font-weight-bold">Team Solary vs Team Vitality</h1>
              <p class="text-grey-lighten-1">
                Un scrim amical pour s'entraîner avant les championnats.
              </p>
            </v-col>
          </v-row>

          <v-row class="mt-4" dense>
            <v-chip color="#282e39" class="ma-1" variant="flat" text-color="white">
              <v-icon left color="primary">mdi-signal</v-icon>Statut : À venir
            </v-chip>

            <v-chip color="#282e39" class="ma-1" variant="flat" text-color="white">
              <v-icon left color="grey">mdi-calendar</v-icon>28/10/2024 - 21:00
            </v-chip>

            <v-chip color="#282e39" class="ma-1" variant="flat" text-color="white">
              <v-icon left color="grey">mdi-trophy</v-icon>Format : BO7
            </v-chip>

            <v-chip color="#282e39" class="ma-1" variant="flat" text-color="white">
              <v-icon left color="grey">mdi-medal</v-icon>Niveau : Grand Champion
            </v-chip>
          </v-row>
        </v-card>

        <!-- TEAMS SIDE-BY-SIDE -->
        <v-row align="center" justify="center" class="my-8">
          <v-col cols="12" md="4">
            <v-card color="surface" class="pa-6" variant="outlined">
              <v-row align="center" justify="center">
                <v-avatar size="128" class="mb-4" color="primary" variant="outlined">
                  <v-img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQReMuLnRowkpDg5IQrcUCii6fMSTk28Fl4k9fNTWcQCT4RJ3INI7Da2778KG8VAWdp3N0wi-7K7sFi_UkVzB2G5yuJgmks11uq9Enhrw-2VZp-4H3ZD1FC-uoIVkjlNpCkujofZRJt16bSHwGzi76MCyjjuvpsCenjWQ2Vl4FXhu3-X11SZVI58xb1s6QNQgbftoEui_pnwZ4hJ78PXdfYjFnuCxOr_kVcrqRDBRF7hR1Nu03ntQ-8abIk3FET6wH_kqlHWjBebw"/>
                </v-avatar>

                <h3 class="text-white text-h6 font-weight-bold text-center">Team Solary</h3>
                <p class="text-grey-lighten-1 text-center">Kaydop, Fairy Peak!, Extra</p>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="2" class="text-center">
            <h2 class="text-grey-lighten-2 text-h3 font-weight-bold my-8">VS</h2>
          </v-col>

          <v-col cols="12" md="4">
            <v-card color="surface" class="pa-6" variant="outlined">
              <v-row align="center" justify="center">
                <v-avatar size="128" class="mb-4" color="orange" variant="outlined">
                  <v-img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_ch1md8EUXa_-EdFUVXEQttD9DjxesMzqR724Zuxitnp8mvVb5B-f_f94GjQ5o6ghwAeIlQw42X-RMeR2jly7wA8HFF1czuIYL2Xp10mom-I-iUWWoC1UZ4dmMzqKj5t8Ijsy1XAIeCZcqnNGeid1S32g0W9fWCvCl9XLrbCeySEE7KYRqV0LNR7D9fU5UsJ0hkao7nBiYO2qd4HMuQl2SWDb1jXmQskh_75tkM611eUgpEGZxVGY4sCZwHW29vQV0U5EQhis2os"/>
                </v-avatar>

                <h3 class="text-white text-h6 font-weight-bold text-center">Team Vitality</h3>
                <p class="text-grey-lighten-1 text-center">Zen, Radosin, Alpha54</p>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- SCORE FORM -->
        <v-card color="surface" class="pa-8" variant="outlined">
          <h3 class="text-center text-white text-h5 font-weight-bold mb-2">Validation du Score Final</h3>
          <p class="text-grey-lighten-1 text-center mb-8">
            Une fois le match terminé, les capitaines d'équipe peuvent soumettre le score final et les statistiques des joueurs ici.
          </p>

          <v-form @submit.prevent="submit">
            <v-row align="center" justify="center" class="mb-6">
              <v-col cols="auto" class="text-center">
                <p class="text-white font-weight-medium mb-2">Team Solary</p>
                <v-text-field
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  color="primary"
                  v-model.number="scoreA"
                  hide-details
                  style="width: 110px; text-align: center;"
                />
              </v-col>

              <v-col cols="auto" class="text-center text-white text-h4 font-weight-bold">-</v-col>

              <v-col cols="auto" class="text-center">
                <p class="text-white font-weight-medium mb-2">Team Vitality</p>
                <v-text-field
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  color="primary"
                  v-model.number="scoreB"
                  hide-details
                  style="width: 110px; text-align: center;"
                />
              </v-col>
            </v-row>

            <!-- PLAYER STATS (rendered inline to avoid registration issues) -->
            <v-row class="mt-8 pt-6" style="border-top: 1px solid rgba(255,255,255,0.08);">
              <v-col cols="12" md="6">
                <h4 class="text-center text-white font-weight-bold mb-4">Team Solary</h4>

                <v-row v-for="(p, idx) in solaryPlayers" :key="'s-'+idx" class="align-center mb-3">
                  <v-col cols="4" class="text-white font-weight-medium">{{ p }}</v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model.number="solaryStats[idx].goals"
                      type="number"
                      label="Buts"
                      hide-details
                      density="compact"
                      variant="outlined"
                      color="primary"
                    />
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model.number="solaryStats[idx].saves"
                      type="number"
                      label="Arrêts"
                      hide-details
                      density="compact"
                      variant="outlined"
                      color="primary"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" md="6">
                <h4 class="text-center text-white font-weight-bold mb-4">Team Vitality</h4>

                <v-row v-for="(p, idx) in vitalityPlayers" :key="'v-'+idx" class="align-center mb-3">
                  <v-col cols="4" class="text-white font-weight-medium">{{ p }}</v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model.number="vitalityStats[idx].goals"
                      type="number"
                      label="Buts"
                      hide-details
                      density="compact"
                      variant="outlined"
                      color="primary"
                    />
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model.number="vitalityStats[idx].saves"
                      type="number"
                      label="Arrêts"
                      hide-details
                      density="compact"
                      variant="outlined"
                      color="primary"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-btn color="primary" block class="mt-6" prepend-icon="mdi-send" type="submit">
              Soumettre Score et Stats
            </v-btn>

            <v-alert class="mt-6" color="primary" variant="tonal" icon="mdi-information-outline" density="comfortable">
              Seuls les capitaines d'équipes peuvent valider le score.
            </v-alert>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue';

const scoreA = ref(0);
const scoreB = ref(0);

const solaryPlayers = ['Kaydop', 'Fairy Peak!', 'Extra'];
const vitalityPlayers = ['Zen', 'Radosin', 'Alpha54'];

const solaryStats = reactive(solaryPlayers.map(()=> ({ goals: 0, saves: 0 })));
const vitalityStats = reactive(vitalityPlayers.map(()=> ({ goals: 0, saves: 0 })));

function submit() {
  // exemple simple : log + alerte
  console.log('Score', scoreA.value, '-', scoreB.value);
  console.log('Solary stats', JSON.parse(JSON.stringify(solaryStats)));
  console.log('Vitality stats', JSON.parse(JSON.stringify(vitalityStats)));
  window.alert(`Score soumis : ${scoreA.value} - ${scoreB.value}`);
}
</script>

<style scoped>
/* Couleurs surfaces / background pour coller à ton design */
.v-application {
  background: #111318;
}

/* personnalisation légère pour headings */
.text-h4 { font-weight: 800; }
.text-h5 { font-weight: 700; }
.text-h6 { font-weight: 700; }
</style>
