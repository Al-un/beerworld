import { LocaleMessageObject } from 'vue-i18n/types'

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
}

export default msgs
