import {createI18n} from "vue-i18n";
import en from "@/assets/lang/en.json"
import fr from "@/assets/lang/fr.json"
import Cookies from 'js-cookie'


const datetimeFormats = {
  'en' : {
    short : {
      year: 'numeric', month: 'numeric', day: 'numeric',
    },long : {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  },
  'fr' : {
    short : {
      year: 'numeric', month: 'numeric', day: 'numeric',
    },long : {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  }
}

const defaultLocale = Cookies.get('locale') || 'en' // Si cookie existe, utilise-le, sinon anglais

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: { en, fr }
})

export default i18n;
