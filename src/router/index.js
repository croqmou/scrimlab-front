// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ScrimPage from '../pages/ScrimPage.vue'
import TeamForm from '@/pages/TeamForm.vue'
import Register from '@/pages/Register.vue'
import Login from "@/pages/Login.vue";
import ScrimForm from "@/pages/ScrimForm.vue";
import TeamsPage from "@/pages/TeamsPage.vue";

const routes = [
  { path: '/', name: 'Scrims', component: ScrimPage, meta: { requiresAuth: true } },
  { path: '/new-team', name: 'NewTeam', component: TeamForm, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/new-scrim', name: 'NewScrim', component: ScrimForm, meta: { requiresAuth: true } },
  { path: '/teams', name: 'Teams', component: TeamsPage, meta: { requiresAuth: true } },
  { path: '/new-team', name: 'NewTeam', component: TeamForm, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
