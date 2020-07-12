import { Context } from '@nuxt/types'
import { Options } from '@nuxtjs/vuetify'
import VueI18n from 'vue-i18n'
import colors from 'vuetify/es5/util/colors'
import { VuetifyPreset } from 'vuetify/types/services/presets'

import { LOCALE_DEFAULT } from '~/i18n'

/**
 * When typing VuetifyPreset, `themes` **must** have all the options (light
 * and dark themes, disabled/default and options properties)
 *
 * @param i18n vue-i18n instance
 */
export const vuetifyCustomOptions: (i18n: VueI18n) => Partial<VuetifyPreset> = (
  i18n
) => ({
  theme: {
    dark: true,
    disable: false,
    default: false,
    options: {},
    themes: {
      light: {
        primary: colors.teal.lighten2,
        accent: colors.blueGrey.darken3,
        secondary: colors.pink.darken1,
        info: colors.blue.lighten2,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent3,
      },
      dark: {
        primary: colors.teal.darken1,
        accent: colors.blueGrey.darken3,
        secondary: colors.pink.darken1,
        info: colors.blue.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent3,
      },
    },
  },
  // >> For some reason, this part always resolve i18n to `undefined`
  // lang: {
  //   // The messages are now handled by vue-i18n so `locales` becomes unnecessary
  //   locales: {},
  //   // In theory, not required anymore as handled by vue-i18n but this makes
  //   // TypeScript happy so let's it happy
  //   current: LOCALE_DEFAULT,
  //   t: (key, ...params) => (i18n ? (i18n.t(key, params) as string) : 'PROUT'),
  // },
})

/**
 * @see https://github.com/nuxt-community/vuetify-module/pull/99
 * @param ctx Nuxt context
 */
const vuetifyOptions = (ctx: Context): Options => {
  const config = vuetifyCustomOptions(ctx.app.i18n)

  return {
    ...config,
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: {},
      current: LOCALE_DEFAULT,
      t: (key, ...params) => ctx.app.i18n.t(key, params) as string,
    },
  }
}

export default vuetifyOptions
