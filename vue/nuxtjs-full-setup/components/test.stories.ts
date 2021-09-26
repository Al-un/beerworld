import { storiesOf } from '@storybook/vue'
import { text } from '@storybook/addon-knobs'

import Logo from './Logo.vue'
import BeerTable from './BeerTable.vue'

storiesOf('Beers', module).add('BeerTable', () => ({
  template: `<beer-table />`,
  components: { BeerTable },
}))

storiesOf('Test', module).add('Logo', () => ({
  template: `<logo />`,
  components: { Logo },
  props: {
    uselessProp: {
      default: text('Useless props', 'This is for testing the knob addon only'),
    },
  },
}))
