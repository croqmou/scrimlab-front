// services/TeamsService.js


import {useAuthFetch} from "@/middleware/useAuthFetch.js";

export const createTeamRequest = async (team) => {
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
