import {createI18n} from "vue-i18n";
import en from "@/assets/lang/en.json"

const datetimeFormats = {
  'en' : {
    short : {
      year: 'numeric', month: 'numeric', day: 'numeric',
    },long : {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  }
}

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: en,
  },
  datetimeFormats
});

export default i18n;
