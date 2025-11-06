<template>
  <v-app class="bg-background">
    <!-- HEADER -->
    <v-app-bar flat color="transparent" class="border-b border-white/10">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-3">
          <v-icon color="primary" size="32">mdi-rocket</v-icon>
          <h2 class="text-h6 font-weight-bold text-white">RL Scrims</h2>
        </div>
        <div class="d-none d-md-flex align-center gap-6">
          <v-btn text color="white">Profil</v-btn>
          <v-btn text color="white" class="text-opacity-70">Équipes</v-btn>
          <v-btn text color="white" class="text-opacity-70">Scrims</v-btn>
          <v-btn text color="white" class="text-opacity-70">Tournois</v-btn>
          <v-btn icon variant="flat" color="white">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
          <v-btn icon variant="flat" color="white">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
          <v-avatar size="40">
            <v-img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsg5wbHW5QbWE5gBKeanqpwlF3jbiDWG1Mre81d2oUPUwIWPjPHbUYMIf38np9TrADilb3ugWEcXVZ7XZXC9FD_wO0BZh9lYX3nYD_qlngF-EOxzvNJogUQYmqLSIYNHtfeprLJMT7ZitClVj3lzaC7OL6H50307vs51ZgNa2Nx2qB6deiB0A0EAmr9vlLYqF2FXxSMdSe6guONxOMC42fRSsWS09ri44WYrNuM2HJ8ICevSD-QsD7OPpiQ2qgzX1EN6jV2_5ezvw"
            />
          </v-avatar>
        </div>
      </v-container>
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-main class="py-8">
      <v-container max-width="960">
        <!-- Player Info -->
        <v-row class="align-center mb-6">
          <v-col cols="12" md="6" class="d-flex align-center gap-4">
            <v-avatar size="96" class="border border-primary">
              <v-img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACCDE1ZX4GcO7BSa1v1_adTAc_fuSaVbDIXZMNA2kF25HOaGytrICtSsfyKf0HTcgCRK2LMEBfeC7_vAwcnEdm1AmaWYpFntV71g9A7bvx6_ghlYHh4q6KQZqVW4vNdJXfo5tdYXL6QyRVlAXZeiMAyutEoa_AsxN2MqaRqMAzyMMtR9MHCTYEL25EG8Hk8S7Ky-P9Ao6J6zqV_nd7SMiDfk_5Q8GMEvW2PvwD_j96WDZIt9HBhz6H1VkD76NSmwNIsNJxt09HnTU"
              />
            </v-avatar>
            <div>
              <div class="text-primary text-h6 font-weight-bold">Grand Champion</div>
              <div class="text-white text-h5 font-weight-bold">PlayerName123</div>
              <div class="d-flex align-center text-success text-body-2">
                <v-icon size="10" color="success" class="mr-1">mdi-circle</v-icon>
                En ligne
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Stats -->
        <v-row>
          <v-col cols="12" sm="4" v-for="stat in stats" :key="stat.label">
            <v-card class="pa-4 bg-surface border border-white/10">
              <p class="text-white text-opacity-70">{{ stat.label }}</p>
              <p class="text-white text-h6 font-weight-bold">{{ stat.value }}</p>
            </v-card>
          </v-col>
        </v-row>

        <!-- Teams -->
        <section class="mt-8">
          <h2 class="text-white text-h6 font-weight-bold mb-4">Équipes</h2>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="team in teams" :key="team.name">
              <v-card class="pa-4 text-center bg-surface border border-white/10">
                <v-avatar size="64" class="mx-auto mb-3">
                  <v-img :src="team.logo" />
                </v-avatar>
                <p class="text-white font-weight-semibold">{{ team.name }}</p>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- Scrims -->
        <section class="mt-8">
          <h2 class="text-white text-h6 font-weight-bold mb-4">Historique des Scrims</h2>
          <v-table class="bg-surface border border-white/10">
            <thead>
            <tr class="text-white text-uppercase text-caption">
              <th>Adversaire</th>
              <th>Score</th>
              <th>Résultat</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="match in scrims"
              :key="match.opponent"
              class="hover:bg-white/5 transition"
            >
              <td class="text-white font-weight-medium">{{ match.opponent }}</td>
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
            <h2 class="text-white text-h6 font-weight-bold">Tournois</h2>
            <v-btn color="primary" prepend-icon="mdi-plus" class="text-white font-weight-bold">
              Ajouter un Tournoi
            </v-btn>
          </div>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="tournament in tournaments" :key="tournament.name">
              <v-card class="pa-4 bg-surface border border-white/10 hover:border-primary">
                <p class="text-primary font-weight-bold">{{ tournament.name }}</p>
                <p class="text-white text-opacity-70 text-body-2">{{ tournament.date }}</p>
                <p class="text-white font-weight-semibold">Résultat : {{ tournament.result }}</p>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const stats = [
  { label: "Points", value: "8,450" },
  { label: "Victoires", value: "523" },
  { label: "Défaites", value: "210" },
];

const teams = [
  {
    name: "The Galactic Knights",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqMD7EwGNso1cyOBmZidIkSy_xQwHrZI4vGhdruIbq4PcFJgjmorDtfWi8rjAZ2P27LIda1Vb3C6qXd1zfpnjrGYoOucePYSWxNj5eKcjgjHf3lhojNO4GZsfyFjwici02_M5ti3nCj-dakheBrzKjxfwDMuZ4TBg8QqGuCM9QlmRcX_y9aQzeuXQtau8E6sOURhCA8lnzoOcxBb6mJdhcxem1qUt-2F3hZvgiB6JQ9lsVyoNsUdKKdu4wQq-zdOEPuBuypg8lcGw",
  },
  {
    name: "Nebula Strikers",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7LSFxcVkBEoKLbIWmnrzvGXG5rZwSXaELlScYjd51G-JFT-Po79wJKqxBg8g3NMMtRntJvjKM49cVq8bm_Gltq2Fwl2LORC6ixeDmMMkLBHQY0Aw08QFtH-dWgx8GfMKtGr3tpak9RNYLO_5QNL-1RVSclFJC3A5YWn_6Z_FqWv2zGUVtvRgyCYgHt6X7KKMccZ8YhDwVY_HEZGLOpM47hW-Y2domW62hET7jAyMYC8ls6IbFfCnr8onPWSzDpwXbDGvA4Msx20g",
  },
];

const scrims = [
  { opponent: "Cosmic Guardians", score: "3 - 1", result: "Victoire", date: "2023-10-26" },
  { opponent: "Solar Flares", score: "2 - 3", result: "Défaite", date: "2023-10-24" },
  { opponent: "Void Runners", score: "4 - 0", result: "Victoire", date: "2023-10-22" },
  { opponent: "Quantum Leapers", score: "1 - 2", result: "Défaite", date: "2023-10-21" },
];

const tournaments = [
  { name: "RLCS Winter Major", date: "2023-03-12", result: "Top 8" },
  { name: "Gamers8 Invitational", date: "2023-08-20", result: "Top 16" },
  { name: "DreamHack Summer Open", date: "2023-06-15", result: "Top 4" },
];
</script>

<style scoped>
.bg-background {
  background-color: #0d1117;
  color: white;
}
.bg-surface {
  background-color: #1A202C;
}
.border {
  border-width: 1px;
  border-style: solid;
}
</style>
