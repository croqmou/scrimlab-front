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
        v-model="team.teamLogo"
        accept=".jpg, .jpeg, .png"
      ></v-file-input>

      <v-text-field
        v-model="team.teamDescription"
        label="Description (optional)"
        maxlength="50"
      ></v-text-field>

      <!--
    <v-autocomplete
      v-model="team.playerOne"
      :items="players"
      label="Player 1*"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.playerTwo"
      :items="players"
      label="Player 2*"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.playerThree"
      :items="players"
      label="Player 3*"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.sub"
      :items="players"
      label="Sub (optional)"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.secondSub"
      :items="players"
      label="Second sub (optional)"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.coach"
      :items="players"
      label="Coach (optional)"
      solo
    ></v-autocomplete>

    <v-autocomplete
      v-model="team.manager"
      :items="players"
      label="Manager (optional)"
      solo
    ></v-autocomplete>
    -->

      <v-btn class="mt-2 submit" type="submit" :disabled="!valid" block>Create</v-btn>
    </v-form>
  </v-sheet>
</template>


<script setup>
  import {ref} from "vue";
  import {createTeamRequest} from "@/services/TeamsService.js";
  import router from "@/router/index.js";

  const team = ref({
    teamName: "",
    teamLogo: "unknown.png",
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

  const valid = ref(false)

  const teamNameRules = [
    v => !!v || 'Username is required',
    v => v.length <= 26 || 'Maximum 26 characters'
  ]


  function createTeam(){
    if (valid.value) {
      const result = createTeamRequest(team.value)
      if (result.success) {
        router.push('/teams') // redirection après inscription
      }
    }
  }
</script>

<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/verminVibes.ttf");
}

h1{
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

.form-sheet{
  margin-top: 20px;
  margin-bottom: 150px;
}

.submit{
  background-color: #668def;
  color: white;
}
</style>
