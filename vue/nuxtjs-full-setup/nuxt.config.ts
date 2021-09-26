import colors from 'vuetify/es5/util/colors'
import { LOCALE_DEFAULT } from './i18n'

import messages from './i18n/'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: 'BW | %s',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  i18n: {
    defaultLocale: LOCALE_DEFAULT,
    // --- If lazy=true is required, langDir and locales-as-array would be
    // --- already ready
    // https://github.com/nuxt-community/nuxt-i18n/blob/145f3b2a080a91028fd5ef59f9c8bd88755d3b4b/docs/lazy-load-translations.md
    langDir: 'i18n/',
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en/index.ts' },
      { code: 'fr', iso: 'fr-FR', file: 'fr/index.ts' },
    ],
    // For some reason, if lazy is false, then the messages are not properly loaded
    lazy: true,
    // // --- If using default vue-i18n configuration
    // locales: ['en', 'fr'],
    // vueI18n: {
    //   fallbackLocale: 'en',
    //   messages,
    //   // messages: {
    //   //   en: messages.en,
    //   //   fr: messages.fr,
    //   // },
    // },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: 'vuetify.options.ts',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
