<template>
  <div id="app">
    <main class="content">
      <template v-if="beers">
        <h3 class="full-width-griditem">Loaded beers:</h3>
        <div v-for="(beer, idx) in beers" :key="idx">name: {{ beer.name }}</div>
      </template>
      <div v-else class="full-width-griditem">Loading...</div>
    </main>
  </div>
</template>

<script>
import { getBeers } from "./api";

export default {
  name: "App",
  data: function() {
    return {
      beers: undefined
    };
  },
  created: async function() {
    this.beers = await getBeers();
    console.log("Loaded beers: ", { beers: this.beers });
  }
};
</script>

<style>
/* CSS reset */
html,
body {
  margin: 0;
  padding: 0;
}

/* App */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #37474f;
  color: #eceff1;
}

/* Content */
.content {
  width: 98%;
  max-width: 800px;
  margin: auto;

  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
}

.content div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 120px;
  padding: 8px;
  background-color: #455a64;
  text-align: center;
}

.content .full-width-griditem {
  grid-column: span 3;
}

/* Make it kind of responsive */
@media only screen and (max-width: 600px) {
  .content .full-width-griditem {
    grid-column: span 2;
  }

  .content {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
