<template>
  <div>
    <div>
      <span>Testing some icons:</span>
      <v-icon>mdi-home</v-icon>
    </div>

    <v-data-table
      :headers="headers"
      :items="beers"
      :items-per-page="5"
    ></v-data-table>

    <v-chip close color="teal" text-color="white" close-icon="mdi-delete">
      <v-avatar left> <v-icon>mdi-checkbox-marked-circle</v-icon> </v-avatar
      >Confirmed
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Beer } from '~/models'

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
  {
    id: 1,
    name: 'Grimbergen',
    country: 'Belgium',
    type: 'Blonde Ale - Belgian',
  },
  {
    id: 2,
    name: 'Grimbergen Double-Ambree',
    country: 'Belgium',
    type: 'Dubbel',
  },
  {
    id: 3,
    name: 'Leffe Blonde',
    country: 'Belgium',
    type: 'Blonde Ale - Belgian',
  },
  {
    id: 4,
    name: 'Leffe Radieuse',
    country: 'Belgium',
    type: 'Strong Ale - Belgian Dark',
  },
  {
    id: 5,
    name: 'La Chouffe',
    country: 'Belgium',
    type: 'Strong Ale - Belgian Pale',
  },
  { id: 6, name: 'Tripel Karmeliet', country: 'Belgium', type: 'Tripel' },
  {
    id: 7,
    name: 'Hoegaarden',
    country: 'Belgium',
    type: 'Wheat Beer - Witbier',
  },
  {
    id: 8,
    name: 'Paulaner Original Münchner Dunkel ',
    country: 'Germany',
    type: 'Lager - Munich Dunkel',
  },
  {
    id: 9,
    name: 'Affligem Blond',
    country: 'Belgium',
    type: 'Blonde Ale - Belgian',
  },
]

export default Vue.extend<{}, {}, Computed, Props>({
  name: 'BeerTable',
  props: {
    beers: { type: Array as () => Beer[], default: () => beersList },
  },

  computed: {
    headers() {
      return [
        // { text: 'beer.id', value: 'id' },
        // { text: 'beer.name', value: 'name' },
        // { text: 'beer.country', value: 'country' },
        // { text: 'beer.type', value: 'type' },
        { text: this.$i18n.t('beer.id') as string, value: 'id' },
        { text: this.$i18n.t('beer.name') as string, value: 'name' },
        { text: this.$i18n.t('beer.country') as string, value: 'country' },
        { text: this.$i18n.t('beer.type') as string, value: 'type' },
      ]
    },
  },
})
</script>
