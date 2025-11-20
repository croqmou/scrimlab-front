<template>
  <div class="team-card-container" @click="console.log('team card clicked')">
    <img :src="getLogoUrl(teamLogo)" alt="" class="team-logo">
    <div class="team-card-components">
      <div class="team-infos">
        <img src="../assets/img/backgrounds/headerBG.png" alt="" class="team-banner">
        <div class="team-main-infos">
          <p>{{ teamName }}</p>
          <div class="team-elo-container">
            <p>{{ rankingPoints }}</p>
            <img src="../assets/img/elo.png" alt="" class="team-elo-img">
          </div>
        </div>
        <div class="team-secondary-infos">

          <div>
            <p>goals</p>
            <img src="../assets/img/goals.png" alt="">
            <p>{{ teamGoals }}</p>
          </div>

          <div>
            <p>wins</p>
            <img src="../assets/img/wins.png" alt="">
            <p>{{ teamWins }}</p>
          </div>

          <div>
            <p>loses</p>
            <img src="../assets/img/loses.png" alt="">
            <p>{{ teamLoses }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import { getLogoUrl } from '@/utils/ImageUrl.js'


defineProps({
  teamName: String,
  teamLogo: String,
  rankingPoints: Number,
  teamGoals: Number,
  teamWins: Number,
  teamLoses: Number
})

</script>


<style scoped>

@font-face {
  font-family: "kdam";
  src: url("../assets/fonts/KdamThmorPro-Regular.ttf");
}

.team-card-container{
  background-color: white;
  width: 350px;
  height: 250px;
  border-radius: 6px;
  box-shadow: 0 5px 15px black;
  display: flex;
  flex-direction: column;
  justify-content: start;
  cursor: pointer;
}

.team-logo{
  position: absolute;
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  border: 4px solid white;
  background-color: black;
}

.team-banner{
  width: 100%;
  height: 125px;
  border-radius: 5px 5px 0 0;
}

.team-main-infos{
  position: relative;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  font-family: "kdam", serif;
}

.team-elo-container{
  display: flex;
  align-items: center;
}

.team-elo-container *{
  margin: 2px;
}

.team-elo-img{
  width: 20px;
  height: 20px;
}

.team-secondary-infos{
  position: relative;
  left: 160px;
  bottom: 46px;
  width: 170px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-family: "kdam", serif;
}

.team-secondary-infos div{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-secondary-infos div p{
  margin-bottom: 5px;
}

.team-secondary-infos img{
  width: 35px;
  margin-bottom: 5px;
}

@media screen and (max-width: 780px){
  .team-secondary-infos{
    justify-content: normal;
    left: 130px;
    width: 0;
  }

  .team-secondary-infos div{
    margin: 8px;
  }

  .team-secondary-infos div p{
    font-size: 10px;
  }

  .team-secondary-infos img{
    width: 25px;
  }
}

</style>
