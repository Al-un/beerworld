import { LocaleMessageObject } from 'vue-i18n/types'

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
}

export default msgs
