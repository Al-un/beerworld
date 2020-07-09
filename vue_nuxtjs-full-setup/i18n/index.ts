import enMsgs from './en'
import enVuetify from './en-vuetify'
import frMsgs from './fr'
import frVuetify from './fr-vuetify'

const i18nMsgs = {
  en: {
    ...enMsgs,
    $vuetify: enVuetify,
  },
  fr: {
    ...frMsgs,
    $vuetify: frVuetify,
  },
}

export default i18nMsgs
