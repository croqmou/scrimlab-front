// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ScrimPage from '../pages/ScrimPage.vue'
import TeamForm from '@/pages/forms/TeamForm.vue'
import Register from '@/pages/Register.vue'
import Login from "@/pages/Login.vue";
import ScrimForm from "@/pages/forms/ScrimForm.vue";
import TeamsPage from "@/pages/TeamsPage.vue";
import PlayerProfilePage from '@/pages/PlayerProfilePage.vue'
import TeamProfilePage from '@/pages/TeamProfilePage.vue'

const routes = [
  { path: '/', name: 'Scrims', component: ScrimPage, meta: { requiresAuth: false } },
  { path: '/new-team', name: 'NewTeam', component: TeamForm, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/new-scrim', name: 'NewScrim', component: ScrimForm, meta: { requiresAuth: true } },
  { path: '/teams', name: 'Teams', component: TeamsPage, meta: { requiresAuth: false } },
  { path: '/profile', name: 'PlayerProfile', component: PlayerProfilePage, meta: { requiresAuth: true } },
  { path: '/team-profile/:teamName', name: 'TeamProfile', component: TeamProfilePage, meta: { requiresAuth: false } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
