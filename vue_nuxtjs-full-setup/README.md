# Nuxtjs full setup <!-- omit in toc -->

Mainly self notes for setting up a Nuxtjs application with Vuetify, vue-i18n and Storybook.

- [Nuxtjs setup](#nuxtjs-setup)
  - [Nuxtjs](#nuxtjs)
  - [Nuxt-i18n](#nuxt-i18n)
- [Storybook setup](#storybook-setup)
  - [Storybook core and addons](#storybook-core-and-addons)

> Note: In VS Code, Vetur does not like "monorepo-like" folder structure and will flag TypeScript as `xxx is not a module`. I fixed the issue by opening the folder in a new VS Code window

## Nuxtjs setup

### Nuxtjs

Start with the magic setup command (see [Nuxtjs docs: installation](https://nuxtjs.org/guide/installation)):

```sh
npx create-nuxt-app
```

![Full configuration](../beerworld/screenshots/vue_nuxtjs-full-setup-01.png)

> Note: at the time of running `create-nuxt-app` v3.1.0, TypeScript is already configured so there is no need to proceed to any TypeScript setup ([Nuxt TypeScript doc link](https://typescript.nuxtjs.org/guide/setup.html)). [`create-nuxt-app` releases list](https://github.com/nuxt/create-nuxt-app/releases/tag/v2.15.0) mentions the TypeScript support from v2.15.0

> Note 2: starting from `create-nuxt-app` v3.0.0, minimum Node.js version is 10.20.0 (see [v3.0.0. release notes](https://github.com/nuxt/create-nuxt-app/releases/tag/v3.0.0))

### Nuxt-i18n

Following [Nuxt-i18n setup guide](https://nuxt-community.github.io/nuxt-i18n/setup.html):

- Install `nuxt-i18n`:
  ```sh
  npm install nuxt-i18n
  ```
- Add `nuxt-i18n` type in _tsconfig.json_:

  ```json
  {
    "compilerOptions": {
      "types": ["@types/node", "@nuxt/types", "vuetify/types", "nuxt-i18n"]
    }
  }
  ```

- Create I18n entries in the _i18n/_ folder:

  ```
  {nuxt project}
  i18n/
    en.ts
    fr.ts
    index.ts <-- for re-export only
  ```

- Add `nuxt-i18n` plugin in _nuxt.config.ts_ and configure `i18n` global variable

  ```js
  export default {
    modules: [
      // ...
      'nuxt-i18n',
    ],
    // ...
    i18n: {
      // configuration here (see below)
    },
  }
  ```

- Update _pages/index.vue_ to use the newly created I18n entries:

  ```html
  <template>
    <div>{{ $t('hello') }}</div>
  </template>
  ```

Regarding the `i18n` configuration, the basic configuration is simply the standard `vue-i18n` configuration:

```js
import i18nMsgs from './i18n/'

export default {
  // ...
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: i18nMsgs.EN,
        fr: i18nMsgs.FR,
      },
    },
  },
}
```

However, some features are specific to the nuxt plugin, such as lazy loading. The configuration must be declared differently:

```js
export default {
  // ...
  i18n: {
    defaultLocale: 'fr',
    langDir: 'i18n/',
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en.ts' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.ts' },
    ],
    lazy: true,
  },
}
```

> Note: if `lazy: true`, then `langDir` must be defined and `locales` has to be an array. However, it also works the other way around: if `langDir` is defined and `locales` is an array then `lazy` must be true.

**References**:

- [`vue-i18n` repo](https://github.com/kazupon/vue-i18n)
- [`vue-i18n` docs](https://kazupon.github.io/vue-i18n/)
- [`nuxt-i18n` repo](https://github.com/nuxt-community/nuxt-i18n)
- [`nuxt-i18n` docs](https://nuxt-community.github.io/nuxt-i18n/)

## Storybook setup

### Storybook core and addons

- Install Storybook
  ```sh
  # Install Storybook
  npm install @storybook/vue --save-dev
  # Only this dependency should be missing
  npm install babel-preset-vue --save-dev
  # Install Storybook addons
  npm install @storybook/addon-knobs @storybook/addon-viewport @storybook/addon-storysource --save-dev
  ```
- Add scripts in _package.json_:

  ```json
  {
    "scripts": {
      "storybook": "start-storybook",
      "storybook:build": "build-storybook"
    }
  }
  ```

- Create a _.storybook/_ folder
- Create the _.storybook/main.js_ configuration file:

  ```js
  // main.js
  module.exports = {
    addons: [
      '@storybook/addon-knobs',
      '@storybook/addon-viewport',
      '@storybook/addon-storysource',
    ],
  }
  ```

  As well as the _.storybook/preview.js_ which will be useful when configuring plugins:

  ```js
  // preview.js
  import { configure } from '@storybook/vue'

  import Vue from 'vue'

  configure(require.context('../', true, /\.stories\.ts$/), module)
  ```

> Note: when creating a testing _xxx.stories.ts_ file, I encountered an issue when importing a Vue file in the TypeScript file. Creating _shims-vue.d.ts_ file fixes that issue

**References**:

- [Storybook for Vue guide](https://storybook.js.org/docs/guides/guide-vue/)
- [Storybook addon: Knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs)
- [Storybook addon: Viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport)
- [Storybook addon: Storysource](https://github.com/storybookjs/storybook/tree/master/addons/storysource)
