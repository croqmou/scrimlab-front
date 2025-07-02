<template>
  <h1>New team</h1>
  <v-sheet class="mx-auto form-sheet" width="300">
    <v-form ref="form" v-model="valid" @submit.prevent="createTeam">
      <v-text-field
        v-model="team.teamName"
        label="Team name*"
        maxlength="26"
        :rules="teamNameRules"
        required
      ></v-text-field>

      <v-file-input
        label="Choose a team logo (optional)"
        v-model="logoFile"
        accept=".jpg, .jpeg, .png"
      ></v-file-input>

      <v-text-field
        v-model="team.teamDescription"
        label="Description (optional)"
        maxlength="50"
      ></v-text-field>

      <v-btn class="mt-2 submit" type="submit" :disabled="!valid" block>Create</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue"
import { createTeamRequest, uploadLogo } from '@/services/TeamsService.js'
import axios from "axios"
import router from "@/router/index.js"

const team = ref({
  teamName: "",
  teamLogo: "unknown.png", // sera remplacé si upload
  teamDescription: "",
  captain: null,
  playerEntityTwo: null,
  playerEntityThree: null,
  sub: null,
  secondSub: null,
  coach: null,
  manager: null,
  rankingPoints: 0
})

const logoFile = ref(null)
const valid = ref(false)

const teamNameRules = [
  v => !!v || 'Team name is required',
  v => v.length <= 26 || 'Maximum 26 characters'
]


async function createTeam() {
  if (valid.value) {
    const uploadedFileName = await uploadLogo(logoFile)
    if (uploadedFileName) {
      team.value.teamLogo = uploadedFileName
    }

    const result = await createTeamRequest(team.value)
    if (result.success) {
      await router.push('/teams')
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/Vermin Vibes.woff2");
}

h1 {
  margin-top: 70px;
  text-align: center;
  font-family: "Vermin Vibes";
  font-size: 80px;
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px  1px 0 black,
    1px  1px 0 black;
}

.form-sheet {
  margin-top: 20px;
  margin-bottom: 150px;
}

.submit {
  background-color: #668def;
  color: white;
}
</style>
