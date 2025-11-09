import { jwtDecode } from "jwt-decode"
import { useAuthFetch } from "@/middleware/useAuthFetch.js"
import i18n from '@/plugins/i18n.js'
import { useNotificationStore } from '@/stores/useNotificationStore.js'

const {t} = i18n.global

const TeamsService = {
  async uploadLogo(logoFile) {
    if (!logoFile?.value) return null

    const formData = new FormData()
    formData.append("file", logoFile.value)

    const { api } = useAuthFetch()

    try {
      const response = await api.post("/files/upload/team-logo", formData)
      return response.data.filename
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.teams.logo_upload')], true);
      return {message: t('errors.teams.logo_upload')}
    }
  },

  async uploadBanner(bannerFile) {
    if (!bannerFile?.value) return null

    const formData = new FormData()
    formData.append("file", bannerFile.value)

    const { api } = useAuthFetch()

    try {
      const response = await api.post("/files/upload/team-banner", formData)
      return response.data.filename
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.teams.logo_upload')], true);
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

      useNotificationStore().pushNotification([t('success.teams.created')], false);
      return { success: true }
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.teams.create')], true);
      return {
        success: false,
        message: t("errors.teams.create"),
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
      useNotificationStore().pushNotification([t('errors.teams.get_all')], true);
      return { success: false, message: t('errors.teams.get_all') }
    }
  },

  async getAllTeamsByPlayer(player) {
    try {
      const { api } = useAuthFetch()
      const result = await api.get(`/teams/getAllByPlayer/${player.email}`)
      return result.data
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.teams.get_all')], true);
      return { success: false, message: t('errors.teams.get_all') }
    }
  },
}

export default TeamsService
