import { BeerDAO, Beer } from "../models";
import { beers } from "../data";

import { generateMockBeerId } from "./utils";

let dbBeers = beers;

export const DummyBeerDAO: BeerDAO = {
  create: async (beer: Beer) => {
    beer.id = generateMockBeerId(dbBeers);
    dbBeers = [...dbBeers, beer];

    return beer;
  },

  delete: async (beerId: string) => {
    const oldLength = dbBeers.length;
    dbBeers = dbBeers.filter((b) => b.id !== beerId);
    const newLength = dbBeers.length;

    return oldLength - newLength;
  },

  get: async (beerId: string) => {
    const beer = dbBeers.find((b) => b.id === beerId);

    return beer;
  },

  list: async () => {
    return dbBeers;
  },

  update: async (beer: Beer, beerId: string) => {
    let updatedBeer = undefined;

    dbBeers.forEach((oldBeer, idx, beersArray) => {
      if (oldBeer.id === beerId) {
        beersArray[idx] = { ...oldBeer, ...beer };
        updatedBeer = beersArray[idx];
      }
    });

    return updatedBeer;
  },
};
