// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

import ScrimsPage from '../pages/ScrimsPage.vue'

const routes = [
  { path: '/', name: 'Scrims', component: ScrimsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
