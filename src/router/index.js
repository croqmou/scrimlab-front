// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

import ScrimsPage from '../pages/ScrimsPage.vue'
import TeamForm from "@/pages/TeamForm.vue";

const routes = [
  { path: '/', name: 'Scrims', component: ScrimsPage },
  { path: '/new-team', name: 'newTeam', component: TeamForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
