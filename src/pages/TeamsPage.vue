<template>
  <Header />
  <div class="teams-header">
    <h1>TEAMS</h1>
    <v-col class="button-col" cols="auto">
      <v-btn class="new-scrim-button" size="x-large" @click="$router.push('/new-team')">Create a team</v-btn>
    </v-col>
    <v-divider/>
  </div>

  <main>

  </main>

</template>

<script setup>

import Header from "@/components/Header.vue";
import TeamCard from "@/components/TeamCard.vue";
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
