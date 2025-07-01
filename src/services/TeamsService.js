// services/TeamsService.js
import { jwtDecode } from "jwt-decode"; // ✅ fonctionne avec Vite + ESM
import {useAuthFetch} from "@/middleware/useAuthFetch.js";
import axios from 'axios'

export const uploadLogo = async (logoFile) => {
  if (!logoFile.value) return null

  const formData = new FormData()
  formData.append('file', logoFile.value)

  const { api } = useAuthFetch()

  try {
    const response = await api.post("/files/upload", formData)
    return response.data.filename
  } catch (err) {
    console.error("Erreur lors de l'upload du logo :", err)
    return null
  }
}

export const createTeamRequest = async (team) => {

  const token = localStorage.getItem("token"); // ou depuis Vuex/pinia/cookies

  if (token) {
    team.captain = jwtDecode(token).sub;
  }
  const { api } = useAuthFetch()
  try {
    await api.post('/teams/create', team)
    return { success: true }
  } catch (error) {
    console.error('Error team:', error.response?.data || error)
    return {
      success: false,
      message: error.response?.data?.message || 'error.unknown.error'
    }
  }
}
