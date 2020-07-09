import { configure } from '@storybook/vue'

import Vue from 'vue'

configure(require.context('../', true, /\.stories\.ts$/), module)
