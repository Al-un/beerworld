<template>
  <v-data-table :headers="headers" :items="beers" item-key="id"></v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'

import { Beer } from '@/models'

interface Props {
  beers: Beer[]
}

interface Computed {
  headers: {
    align?: string
    sortable?: boolean
    text: string
    value: string
  }[]
}

const beersList: Beer[] = [
  { id: 1, name: 'Grimbergen', country: 'Belgium', type: 'Abbey beer' },
  { id: 2, name: 'Grimbergen 2', country: 'Belgium', type: 'Abbey beer' },
  { id: 3, name: 'Grimbergen 3', country: 'Belgium', type: 'Abbey beer' },
  { id: 4, name: 'Affligem', country: 'Belgium', type: 'Abbey beer' },
  { id: 5, name: 'Affligem 2', country: 'Belgium', type: 'Abbey beer' },
  { id: 6, name: 'Affligem 3', country: 'Belgium', type: 'Abbey beer' },
]

export default Vue.extend<{}, {}, Computed, Props>({
  name: 'BeerTable',
  props: {
    beers: { type: Array as () => Beer[], default: () => beersList },
  },

  computed: {
    headers() {
      return [
        { text: this.$i18n.t('beer.id') as string, value: 'id' },
        { text: this.$i18n.t('beer.name') as string, value: 'name' },
        { text: this.$i18n.t('beer.country') as string, value: 'country' },
        { text: this.$i18n.t('beer.type') as string, value: 'type' },
      ]
    },
  },
})
</script>
