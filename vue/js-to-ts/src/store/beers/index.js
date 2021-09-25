export default {
  actions: {
    fetchBeers: async function ({ commit }) {
      commit("setLoading", true);

      const data = await fetch(
        "https://raw.githubusercontent.com/Al-un/beerworld/media/mocks/beers.json",
        { method: "GET", mode: "cors" }
      );
      const beers = await data.json();

      commit("setBeers", beers);

      commit("setLoading", false);
    },
  },
  mutations: {
    setBeers(state, beers) {
      state.beers = beers;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  state: () => ({ beers: [], loading: false }),
};
