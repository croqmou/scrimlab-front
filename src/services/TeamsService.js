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


export const getAllTeamsRequest = async (options) => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append('page', (options.page - 1).toString());
    queryParams.append('size', options.itemsPerPage.toString());

    if (options.sortBy) {
      const direction = options.sortDir ?? "asc";
      queryParams.append('sort', `${options.sortBy},${direction}`);
    }

    const { api } = useAuthFetch()


    const result = await api.get(`/teams/getAll?${queryParams.toString()}`);
    return result.data;
  } catch (error) {
    //TODO faire la gestion d'erreurs
    //useNotificationStore().pushNotification([t('errors.assignment.not_found')], true);
    //return { message: t('error.unknown.error') };
  }
};
