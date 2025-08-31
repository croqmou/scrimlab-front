<template>
  <Header />
  <div class="teams-header">
    <h1>TEAMS</h1>
    <v-col class="button-col" cols="auto">
      <v-btn class="new-scrim-button" size="x-large" @click="$router.push('/new-team')">Create a team</v-btn>
    </v-col>
    <v-divider/>
  </div>

  <select v-model="sortBy">
    <option value="teamName">Nom</option>
    <option value="rankingPoints">Points</option>
    <option value="teamWins">Victoires</option>
  </select>

  <select v-model="sortDir">
    <option value="asc">Ascendant</option>
    <option value="desc">Descendant</option>
  </select>

  <main>
    <TeamCard v-for="team in teams" :teamName="team.teamName" :teamLogo="team.teamLogo" :rankingPoints="team.rankingPoints" :teamGoals="team.teamGoals" :teamWins="team.teamWins" :teamLoses="team.teamLoses" />
  </main>

</template>

<script setup>

import Header from "@/components/Header.vue";
import TeamCard from "@/components/TeamCard.vue";
import TeamModel from "@/models/TeamModel.js";
import {getAllTeamsRequest} from "@/services/TeamsService.js";
import {onMounted, ref, watch} from "vue";

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

  console.log(response)

  teams.value = response.content.flatMap(team => ({
    teamName: team.teamName,
    teamLogo: team.teamLogo,
    rankingPoints: team.rankingPoints,
    teamGoals: team.teamGoals,
    teamWins: team.teamWins,
    teamLoses: team.teamLoses
  }));
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
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/Vermin Vibes.woff2");
}


h1{
  text-align: center;
  font-family: "Vermin Vibes",serif;
  font-size: 80px;
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px  1px 0 black,
    1px  1px 0 black;
}



.teams-header{
  background-image: url("../assets/img/backgrounds/headerBG.png");
}


.button-col{
  display: flex;
  justify-content: center;
}


.new-scrim-button{
  background-color: #668def;
  color: white;
  margin-bottom: 50px;
}

main{
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

main > *{
  margin: 20px;
}


</style>
