import { LocaleMessageObject } from 'vue-i18n/types'

import vuetifyMsgs from './vuetify'

const msgs: LocaleMessageObject = {
  hello: 'Salut!',
  nested: {
    value: 'Ceci est un message imbriqué',
  },
  beer: {
    id: 'ID',
    name: 'Nom',
    country: 'Pays',
    type: 'Type',
  },
  $vuetify: vuetifyMsgs,
}

export default msgs
