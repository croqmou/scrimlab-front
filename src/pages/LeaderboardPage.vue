<template>
  <v-app>
    <v-main class="bg-background text-white">
      <!-- Header -->
      <v-app-bar color="surface" density="comfortable" flat app>
        <v-container class="d-flex align-center justify-space-between">
          <div class="d-flex align-center gap-3">
            <v-icon color="primary">mdi-grid</v-icon>
            <h2 class="text-h6 font-weight-bold">RL Scrims</h2>
          </div>

          <div class="d-none d-md-flex align-center gap-6">
            <v-btn variant="text" color="white" class="text-body-2">Home</v-btn>
            <v-btn variant="text" color="white" class="text-body-2">Scrims</v-btn>
            <v-btn variant="text" color="primary" class="text-body-2 font-weight-bold"
            >Rankings</v-btn
            >
            <v-btn variant="text" color="white" class="text-body-2">Tournaments</v-btn>
            <v-btn variant="text" color="white" class="text-body-2">Profile</v-btn>

            <v-btn color="primary" rounded>Créer un Scrim</v-btn>

            <v-avatar size="40">
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsbNUyx09LhIahsdSAPVwZfdMJjQh949uQCPLTTZiaSc-Cpj_qb2IUnIL4VEri3KsT7aDSivBRjsAtJv6yFaV5eXyvSWpDwbt0wWSFGxnL9y663wdbnNJu2D8-AH5Z5BnwMTz3i7cVpgbYu3oo4JggynGQIna_zolFM49SjzPLNg6kSpKFRntA9QUq-kyVqpYrpYNHABmcai-AhvHhUxPLtYjKBB5uC8K2-XFMxfvZmxE4Yo-5JMVDJOjgXoxvou5rEVe5dGToKaM"
              />
            </v-avatar>
          </div>
        </v-container>
      </v-app-bar>

      <!-- Main Content -->
      <v-container class="py-10 px-6" style="max-width: 960px;">
        <div class="mb-8">
          <h1 class="text-h3 font-weight-black mb-2">Rankings</h1>
          <p class="text-body-1 text-grey-lighten-1">
            View the top teams and players across all game modes.
          </p>
        </div>

        <!-- Game mode tabs -->
        <v-tabs v-model="selectedMode" background-color="transparent" color="primary">
          <v-tab value="1v1">1v1</v-tab>
          <v-tab value="2v2">2v2</v-tab>
          <v-tab value="3v3">3v3</v-tab>
        </v-tabs>

        <!-- Rankings toggle + search -->
        <v-row class="mt-6" align="center" justify="space-between">
          <v-col cols="12" md="6">
            <v-btn-toggle v-model="rankType" color="primary" rounded group>
              <v-btn value="teams">Team Rankings</v-btn>
              <v-btn value="players">Player Rankings</v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search for a team or player..."
              variant="outlined"
              density="comfortable"
              color="primary"
              hide-details
            />
          </v-col>
        </v-row>

        <!-- Rankings table -->
        <v-card class="mt-6" color="surface" variant="outlined">
          <v-table class="text-white">
            <thead>
            <tr class="text-grey-lighten-1 text-uppercase text-caption">
              <th class="px-4 py-3">Rank</th>
              <th class="px-4 py-3">Team Name</th>
              <th class="px-4 py-3 text-center">MMR</th>
              <th class="px-4 py-3 text-center">W/L Ratio</th>
              <th class="px-4 py-3 text-center">Win %</th>
              <th class="px-4 py-3 text-center">Matches Played</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(team, index) in filteredTeams"
              :key="team.id"
              class="hover:bg-white/5 transition-colors"
            >
              <td class="px-4 py-3 font-bold text-lg">#{{ index + 1 }}</td>
              <td class="px-4 py-3 font-weight-medium">
                <div class="d-flex align-center gap-3">
                  <v-avatar size="32" rounded>
                    <v-img :src="team.logo" />
                  </v-avatar>
                  <a href="#" class="text-white hover:text-primary transition-colors">{{
                      team.name
                    }}</a>
                </div>
              </td>
              <td class="px-4 py-3 text-center text-primary font-weight-bold">
                {{ team.mmr }}
              </td>
              <td class="px-4 py-3 text-center">{{ team.ratio }}</td>
              <td class="px-4 py-3 text-center">{{ team.winPercent }}</td>
              <td class="px-4 py-3 text-center">{{ team.matches }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-card>

        <!-- Pagination -->
        <div class="d-flex justify-center align-center mt-6">
          <v-btn icon variant="text" color="white" @click="prevPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <span class="mx-3 text-body-2"
          >Page {{ page }} of {{ totalPages }}</span
          >

          <v-btn icon variant="text" color="white" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMode = ref('2v2')
const rankType = ref('teams')
const search = ref('')
const page = ref(1)
const totalPages = 25

const teams = ref([
  {
    id: 1,
    name: 'Vortex Gaming',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPcbrTd_v8-5hvsatgGFWQn2chJaS6Lu3dnbLfndIcpwmhRcEOwBYRPka9Kswz755nFlpFXDrQ8alndF5W85PeIQo6BvfLAVlEon--4vNa8FBnEaIYZtbkAzsyVitur2IBpvuN9b9_OIT6J6YzWysZRcItuDMYfyWmtGC-c-vBWG1-cFCn2NTdarff2b7L1ABHzgbFjfOJnZ-u_M1Kn_D6ryGcvzmFDurRwNYv7uLZLKAQghiTY2tgcXYgM_l0NL3pki_TT7gvWA8',
    mmr: 2150,
    ratio: '120/30',
    winPercent: '80%',
    matches: 150,
  },
  {
    id: 2,
    name: 'Nebula Titans',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGc2e1QufTYE3QsuM3tYhkvuXrr8R2zmtHgItrgQJiZof0kqJMBjHTvOBDRnAKR9fbwqi6_hvHqM8EvrgyxVda7-AR3zyINVzR10l0Z6FRZMIvWewcAJRv6LKoiQ63cOX2BBZv87Fa1vgRWLgM9a4knVxB5DyIvcBYhlXqQFqnVDFkHxA3FuJ01kaAiBEwsUeSfBcXABIWs9Ci7sBiZxhh_-KnzsXH-vfQL6KUe4nTllLbfeWl7kVNJlzJC8iAcCm9myG6c1-nn6A',
    mmr: 2125,
    ratio: '115/35',
    winPercent: '76%',
    matches: 150,
  },
  {
    id: 3,
    name: 'Phoenix Fire',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5b1fdowTlTzMPYYbs189ha_4UNsesked_H_-2HMgSFH1-h3l24GpQPxM4eNR6NlJBXcTEaNBmiRNFXwbDz4b-M_cvzpsbhF7lGk4GH8GVo6Mj_no-RF8TcVqjEQidHowwhwgVN8cAUj5WNaY_I_89-sdBVih260zv1F2jU6YmOVuF7V_2W8wEQjrefMCthEqEyMZtcrWYMiUQiTBABDpYdkNWYXmJZIIxoYYG1xIsZ0b8J1FKJp7KAEdMDV8eIZPOWmC4qLhPy-o',
    mmr: 2090,
    ratio: '110/42',
    winPercent: '72%',
    matches: 152,
  },
  {
    id: 4,
    name: 'Shadow Strikers',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9UYsjQDwszIFcn6wX2K3XMQOkShiVs7plcYFBBkq2stNaE-JLzzDchfKW-o6Ce4gM5A_29tHc0VMFisbCy_oHxXtu_F1EQZdydW_azKfbSTQD5dZKXKQgpBh-4zqLGOtaMXU7AmLT2OIUOdS9IreIm9ru_so9Np4Hy3UTgQlOH141tScusUmS_seWasbqd8C8OWjYIp3Q7M5rIzlqufPrZy5kzUm-KpG6bUbq8QETHBmoIIG4rZxUpws5ncEAIj2LgoZsD0Ki9l8',
    mmr: 2077,
    ratio: '105/45',
    winPercent: '70%',
    matches: 150,
  },
])

const filteredTeams = computed(() => {
  if (!search.value) return teams.value
  return teams.value.filter((t) =>
    t.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages) page.value++
}
</script>

<style scoped>
.v-application {
  font-family: 'Space Grotesk', sans-serif;
}

.bg-background {
  background-color: #101c22 !important;
}

.v-card {
  background-color: #16232a !important;
}

.v-application,
.v-main,
.v-container {
  color: #ffffff;
}
</style>
