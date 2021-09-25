<template>
  <div class="beer-grid">
    <p v-show="loading">Loading...</p>
    <beer-grid-item v-for="(beer, idx) in beers" :key="idx" :beer="beer" />
  </div>
</template>

<script>
import BeerGridItem from "./BeerGridItem.vue";

export default {
  components: { BeerGridItem },
  props: {
    beers: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.beer-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: auto;
  max-width: 700px;
  width: 100%;
}
</style>
