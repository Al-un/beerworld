import { LocaleMessageObject } from 'vue-i18n/types'

// import defaultVuetify from 'vuetify/src/locale/fr'
import defaultVuetify from './vuetify_default'

const msgs: LocaleMessageObject = {
  ...defaultVuetify,
  dataTable: {
    ...defaultVuetify.dataTable,
    itemsPerPageText: 'Biere par page',
  },
  dataFooter: {
    ...defaultVuetify.dataFooter,
    pageText: '{0}>{1} / {2}',
  },
}

export default msgs
