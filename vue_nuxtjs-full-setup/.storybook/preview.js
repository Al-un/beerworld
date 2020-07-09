import { configure, addDecorator } from '@storybook/vue'
import { withKnobs, select, boolean } from '@storybook/addon-knobs' // Hack from https://github.com/storybookjs/storybook/issues/6219#issuecomment-482478962

// --- Vue
import Vue from 'vue'

// --- Vue-i18n (not Nuxt-i18n)
import VueI18n from 'vue-i18n'
import messages from '~/i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  locales: ['en', 'fr'],
  messages,
})

const i18nDecorator = () => ({
  // https://medium.com/studist-dev/internationalization-in-storybook-4be77773494c
  i18n,
  template: `<story />`,
  props: {
    storybookLocale: {
      type: String,
      default: select('I18n locale', ['en', 'fr'], 'en', 'VuePlugins'),
    },
  },
  watch: {
    storybookLocale: {
      handler() {
        this.$i18n.locale = this.storybookLocale
      },
      immediate: true,
    },
  },
  created() {
    // console.log(`=== i18n messages ===`, this.$i18n.messages)
  },
})

// --- Vuetify
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

// https://github.com/nidkil/vuetify-with-storybook/blob/master/src/plugins/vuetify.js
// https://vuetifyjs.com/en/customization/icons/#usage
Vue.use(Vuetify)
const vuetify = new Vuetify({
  // Using spread operator here in case this part will be put in common
  // with nuxt.config.js configuration
  ...{
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    lang: {
      t: (key, ...params) => i18n.t(key, params),
    },
  },
  icons: { iconfont: 'mdiSvg' },
})

const vuetifyDecorator = () => ({
  // https://github.com/nidkil/vuetify-with-storybook/blob/master/config/storybook/config.js
  vuetify,
  template: '<v-app><story/></v-app>',
  props: {
    vuetifyDark: {
      type: Boolean,
      default: boolean('Vuetify Dark theme', true, 'VuePlugins'),
    },
  },
  watch: {
    vuetifyDark: {
      handler() {
        this.$vuetify.theme.dark = this.vuetifyDark
      },
      immediate: true,
    },
  },
})

// --- Storybook decorator
addDecorator(withKnobs)
addDecorator(vuetifyDecorator)
addDecorator(i18nDecorator)

configure(require.context('../', true, /\.stories\.ts$/), module)
