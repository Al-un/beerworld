import { LocaleMessageObject } from 'vue-i18n/types'
import vuetifyMsgs from './en-vuetify'

const msgs: LocaleMessageObject = {
  hello: 'Hello!',
  nested: {
    value: 'This is a nested value',
  },
  beer: {
    id: 'ID',
    name: 'Name',
    country: 'Country',
    type: 'Type',
  },
  $vuetify: vuetifyMsgs,
}

export default msgs
