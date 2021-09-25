<template>
  <div class="beer-grid-item">
    <img class="beer-img" :src="beer.mainPicture" />
    <div class="beer-name">{{ beer.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    beer: { type: Object, required: true },
  },
};
</script>

<style lang="scss">
.beer-grid-item {
  .beer-img {
    width: 100%;
  }
}
</style>
