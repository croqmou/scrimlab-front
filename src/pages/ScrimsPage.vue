<template>
  <header>
    <h1>SCRIMS</h1>
    <v-col class="button-col" cols="auto">
      <v-btn class="new-scrim-button" size="x-large">Create a scrim</v-btn>
    </v-col>
    <v-divider/>
  </header>
</template>

<script setup>

</script>

<style scoped>
@font-face {
  font-family: "Vermin Vibes";
  src: url("../assets/fonts/verminVibes.ttf");
}


h1{
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



header{
  background-image: url("../assets/img/rl_bg.jpg");
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


</style>
