<template>
  <div class="beer-grid">
    <p v-show="loading">Loading...</p>
    <beer-grid-item v-for="(beer, idx) in beers" :key="idx" :beer="beer" />
  </div>
</template>

<script lang="ts" src="./BeerGrid.ts"></script>

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
