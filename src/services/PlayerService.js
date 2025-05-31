import {useNotificationStore} from "@/stores/useNotificationStore.js";
import {useAuthFetch} from "@/middleware/useAuthFetch.js";

const {api} = useAuthFetch()

const addNewPlayer = async () => {
  try {
    const response = await api.get('/players/add-player')
    return response.data
  } catch (error) {
    useNotificationStore().pushNotification("errors.player.not.created", true)
    return {message: 'error.unknown.error'}
  }
}
