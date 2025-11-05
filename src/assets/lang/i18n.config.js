import {languages} from "@/../public/locales/index.js"
import {defineI18nConfig} from "#i18n"

export default defineI18nConfig(() => ({
  strategy: 'no_prefix',
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages: languages
}))
