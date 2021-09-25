import Vue from "vue";
import Vuex from "vuex";

import beersModules from "./beers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    beers: { ...beersModules, namespaced: true },
  },
});
