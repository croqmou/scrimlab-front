// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ScrimsPage from '../pages/ScrimsPage.vue'
import TeamForm from '@/pages/TeamForm.vue'
import Register from '@/pages/Register.vue'

const routes = [
  { path: '/', name: 'Scrims', component: ScrimsPage, meta: { requiresAuth: true } },
  { path: '/new-team', name: 'NewTeam', component: TeamForm, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
