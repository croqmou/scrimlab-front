import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import router from './router'
import { setupRouterGuard } from './router/setupRouterGuard.js' // <-- ici
import { createPinia } from 'pinia'
import i18n from "@/plugins/i18n.js"

const app = createApp(App)
const pinia = createPinia()
app.use(i18n)
const vuetify = createVuetify({ components, directives })

app.use(pinia)               // ⚠️ pinia activé d'abord
setupRouterGuard(router)     // ⚠️ setup du guard ensuite
app.use(router)
app.use(vuetify)
app.mount('#app')
