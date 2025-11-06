import { jwtDecode } from "jwt-decode"
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import i18n from '@/plugins/i18n.js'

const {t} = i18n.global

const TeamsService = {
  async uploadLogo(logoFile) {
    if (!logoFile?.value) return null

    const formData = new FormData()
    formData.append("file", logoFile.value)

    const { api } = useAuthFetch()

    try {
      const response = await api.post("/files/upload", formData)
      return response.data.filename
    } catch (error) {
      //TODO créer une exception personnalisée
      return {message: t('errors.teams.logo_upload')}
    }
  },

  async createTeam(team) {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        const decoded = jwtDecode(token)
        team.captain = decoded.sub
      }

      const { api } = useAuthFetch()
      await api.post("/teams/create", team)

      return { success: true }
    } catch (error) {
      console.error("Error creating team:", error.response?.data || error)
      return {
        success: false,
        message: error.response?.data?.message || "errors.teams.create",
      }
    }
  },

  async getAllTeams(options = { page: 1, itemsPerPage: 10 }) {
    try {
      const queryParams = new URLSearchParams()

      queryParams.append("page", (options.page - 1).toString())
      queryParams.append("size", options.itemsPerPage.toString())

      if (options.sortBy) {
        const direction = options.sortDir ?? "asc"
        queryParams.append("sort", `${options.sortBy},${direction}`)
      }

      const { api } = useAuthFetch()
      const result = await api.get(`/teams/getAll?${queryParams.toString()}`)
      return result.data
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error)
      return { success: false, message: "errors.teams.get_all" }
    }
  },
}

export default TeamsService
