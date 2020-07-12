import { LocaleMessages } from 'vue-i18n'

import en from './en'
import fr from './fr'

export const LOCALE_DEFAULT = 'fr'
export const LOCALES = ['en', 'fr']

const i18nMsgs: LocaleMessages = {
  en,
  fr,
}

export default i18nMsgs
