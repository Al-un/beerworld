<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">{{ $t('hello') }}</v-card-title>
        <v-card-text>
          <span>{{ $t('nested.value') }}</span>
          <beer-table />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import BeerTable from '~/components/BeerTable.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    BeerTable,
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
