import { LocaleMessageObject } from 'vue-i18n/types'

// import defaultVuetify from 'vuetify/src/locale/en'
import defaultVuetify from './vuetify_default'

const msgs: LocaleMessageObject = {
  ...defaultVuetify,
  dataTable: {
    ...defaultVuetify.dataTable,
    itemsPerPageText: 'Beers per page',
  },
  dataFooter: {
    ...defaultVuetify.dataFooter,
    pageText: '{0}>{1} / {2}',
  },
}

export default msgs
