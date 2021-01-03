import { generateDelay, isMockApi } from "./utils";

const MOCK_BEERS =
  "https://raw.githubusercontent.com/Al-un/beerworld/media/mocks/beers.json";

const mockBeersApi = {
  fetchBeers: async () => {
    const data = await fetch(MOCK_BEERS);

    return new Promise((resolve) => {
      setTimeout(() => resolve(data.json()), generateDelay());
    });
  },

  fetchBeer: async (beerId) => {
    const beers = await this.fetchBeers();
    const beer = beers.find((b) => b.id === beerId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(beer), generateDelay());
    });
  },

  cheerBeer: async (beerId) => {
    console.log(`[API] Cheer beer ${beerId}`);
  },

  drinkBeer: async (beerId, userId) => {
    console.log(`[API] User ${userId} has drunk beer ${beerId}`);
  },
};

const realBeersApi = {
  fetchBeers: async () => {
    throw new Error("Not implemented");
  },

  fetchBeer: async (beerId) => {
    throw new Error("Not implemented");
  },

  cheerBeer: async (beerId) => {
    throw new Error("Not implemented");
  },

  drinkBeer: async (beerId, userId) => {
    throw new Error("Not implemented");
  },
};

let beerApi = mockBeersApi;
if (!isMockApi()) {
  beerApi = realBeersApi;
}

export default beerApi;
