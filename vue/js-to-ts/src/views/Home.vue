<template>
  <div class="home">
    <beer-grid :beers="beers" :loading="loadingBeers" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import BeerGrid from "@/components/BeerGrid.vue";

export default {
  name: "Home",
  components: {
    BeerGrid,
  },

  computed: {
    ...mapState({
      beers: (state) => state.beers.beers,
      loadingBeers: (state) => state.beers.loading,
    }),
  },

  async mounted() {
    await this.$store.dispatch("beers/fetchBeers");
  },
};
</script>
