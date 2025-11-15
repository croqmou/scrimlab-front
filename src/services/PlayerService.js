import { useAuthFetch } from '@/middleware/useAuthFetch.js'
import i18n from '@/plugins/i18n.js'
import { useNotificationStore } from '@/stores/useNotificationStore.js'

const {t} = i18n.global

const PlayerService = {
  async createPrizeList(prizeList) {
    try {
      const { api } = useAuthFetch()
      await api.post("/player/prize-list", prizeList)

      useNotificationStore().pushNotification([t('success.prize_list.created')], false);
      return { success: true }
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.prize_list.create')], true);
      return {
        success: false,
        message: t("errors.prize_list.create"),
      }
    }
  },
  async getAllPrizesLists() {
    try {
      const { api } = useAuthFetch()
      const response = await api.get("/player/prize-list")
      return response.data
    } catch (error) {
      useNotificationStore().pushNotification([t('errors.prize_list.get')], true);
      return {
        success: false,
        message: t("errors.prize_list.get"),
      }
    }
  }
}

export default PlayerService
