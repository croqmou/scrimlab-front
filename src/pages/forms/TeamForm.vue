<template>
  <div class="page-wrapper">
    <v-container
      fluid
      class="d-flex justify-center align-center min-h-full"
    >
      <v-card
        class="w-full max-w-[600px] pa-6 rounded-2xl bg-[#182b34] border border-[#223c49] shadow-lg"
        elevation="10"
      >
        <!-- HEADER -->
        <v-row class="align-center justify-space-between mb-6">
          <v-col cols="12" md="6">
            <div>
              <h1 class="text-h4 font-weight-bold text-white">Create Your Team</h1>
              <p class="text-grey-lighten-1">Set up your roster and get ready to compete.</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-md-right">
            <v-btn
              color="grey-lighten-1"
              variant="outlined"
              class="text-none font-weight-bold"
              rounded
              @click="goBack"
            >
              <v-icon start>mdi-arrow-left</v-icon>
              Back
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="my-6" />

        <!-- TEAM DETAILS -->
        <section>
          <h2 class="text-h5 font-weight-bold text-white mb-4">Team Details</h2>

          <v-card class="pa-4 mb-6" color="surface" variant="flat">
            <!-- TEAM LOGO -->
            <v-row align="center" class="mb-6">
              <v-col cols="12" sm="6" class="d-flex align-center">
                <v-avatar size="96" class="mr-4">
                  <v-img
                    :src="logoPreview || placeholderLogo"
                    alt="Team logo"
                    cover
                  />
                </v-avatar>
                <div>
                  <p class="text-white font-weight-medium mb-1">Team Logo</p>
                  <small class="text-grey-lighten-1">PNG or JPG, optional.</small>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="text-sm-right">
                <v-btn color="primary" variant="outlined" class="text-none" @click="triggerLogoUpload">
                  Upload Logo
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  class="d-none"
                  @change="onLogoSelected"
                />
              </v-col>
            </v-row>

            <!-- TEAM BANNER -->
            <v-row align="center" class="mb-6">
              <v-col cols="12" sm="6" class="d-flex align-center">
                <v-avatar rounded size="160" class="mr-4" style="width: 100%; height: 90px; border-radius: 8px; overflow: hidden;">
                  <v-img
                    :src="bannerPreview || placeholderBanner"
                    alt="Team banner"
                    cover
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="6" class="text-sm-right">
                <div>
                  <p class="text-white font-weight-medium mb-1">Team Banner</p>
                  <small class="text-grey-lighten-1">Recommended size: 1200x300px. PNG or JPG.</small>
                </div>
                <v-btn color="primary" variant="outlined" class="text-none mt-2" @click="triggerBannerUpload">
                  Upload Banner
                </v-btn>
                <input
                  ref="bannerInput"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  class="d-none"
                  @change="onBannerSelected"
                />
              </v-col>
            </v-row>

            <!-- TEAM FORM -->
            <v-form ref="form" v-model="valid" @submit.prevent="createTeam">
              <v-text-field
                v-model="team.teamName"
                label="Team name*"
                variant="outlined"
                density="comfortable"
                color="primary"
                :rules="teamNameRules"
                maxlength="26"
                placeholder="Enter your team name"
                class="mt-2 white-input"
                required
              />

              <v-text-field
                v-model="team.teamDescription"
                label="Description (optional)"
                variant="outlined"
                density="comfortable"
                color="primary"
                maxlength="50"
                placeholder="Enter a short description"
                class="mt-4 white-input"
              />

              <v-btn color="red" variant="outlined" class="text-none font-weight-bold mt-4" @click="resetForm">
                Reset
              </v-btn>
            </v-form>
          </v-card>
        </section>

        <v-divider class="my-6" />

        <!-- ACTIONS -->
        <div class="d-flex flex-column flex-sm-row justify-end gap-4">
          <v-btn color="primary" class="text-none font-weight-bold" :disabled="!valid" @click="createTeam">
            Create Team
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue"
import placeholderLogo from "@/assets/img/teams-logos/unknown.png"
import placeholderBanner from "@/assets/img/teams-logos/unknown.png" // ✅ tu peux mettre une vraie bannière par défaut ici
import TeamsService from "@/services/TeamsService.js"
import router from "@/router/index.js"

const team = ref({
  teamName: "",
  teamLogo: "unknown.png",
  teamBanner: "unknown.png",
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
const logoPreview = ref(null)
const bannerFile = ref(null)
const bannerPreview = ref(null)
const valid = ref(false)

const fileInput = ref(null)
const bannerInput = ref(null)

const teamNameRules = [
  v => !!v || "Team name is required",
  v => v.length <= 26 || "Maximum 26 characters"
]

// LOGO UPLOAD
function triggerLogoUpload() {
  fileInput.value?.click()
}
function onLogoSelected(event) {
  const file = event.target.files[0]
  if (file) {
    logoFile.value = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

// BANNER UPLOAD
function triggerBannerUpload() {
  bannerInput.value?.click()
}
function onBannerSelected(event) {
  const file = event.target.files[0]
  if (file) {
    bannerFile.value = file
    bannerPreview.value = URL.createObjectURL(file)
  }
}

async function createTeam() {
  if (valid.value) {
    // upload logo
    const uploadedLogo = await TeamsService.uploadLogo(logoFile)
    if (uploadedLogo) {
      team.value.teamLogo = uploadedLogo
    }

    // upload banner
    const uploadedBanner = await TeamsService.uploadBanner(bannerFile)
    if (uploadedBanner) {
      team.value.teamBanner = uploadedBanner
    }

    // création de l’équipe
    const result = await TeamsService.createTeam(team.value)
    if (result.success) {
      await router.push("/teams")
    }
  }
}

function resetForm() {
  team.value.teamName = ""
  team.value.teamDescription = ""
  logoFile.value = null
  logoPreview.value = null
  bannerFile.value = null
  bannerPreview.value = null
}

function goBack() {
  router.push("/teams")
}
</script>

<style scoped>
.page-wrapper {
  background-color: #111318;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-container {
  padding: 0;
  height: 100%;
  width: 100%;
}

.v-card {
  background-color: #1f232c !important;
  border: 1px solid #223c49;
}

.text-grey-lighten-1 {
  color: #90b7cb !important;
}

.v-btn {
  border-radius: 8px !important;
}

.v-btn.primary {
  background-color: #0da6f2 !important;
  color: #fff !important;
}

.v-btn.v-btn--outlined {
  border-color: #90b7cb !important;
  color: #90b7cb !important;
}

/* Champs texte blancs */
.white-input :deep(.v-label),
.white-input :deep(.v-field__input),
.white-input :deep(input::placeholder),
.white-input :deep(.v-field__outline) {
  color: #fff !important;
  border-color: #fff !important;
}
</style>
