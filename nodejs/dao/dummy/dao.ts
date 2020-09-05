import { Beer, DAO } from "../models";
import { generateMockBeerId } from "./utils";
import { beers } from "../data";

let dbBeers = beers;

export class DummyDao implements DAO {
  async createBeer(beer: Beer) {
    beer.id = generateMockBeerId(dbBeers);
    dbBeers = [...dbBeers, beer];

    return beer;
  }

  async deleteBeer(beerId: string) {
    const oldLength = dbBeers.length;
    dbBeers = dbBeers.filter((b) => b.id !== beerId);
    const newLength = dbBeers.length;

    return oldLength - newLength;
  }

  async getBeer(beerId: string) {
    const beer = dbBeers.find((b) => b.id === beerId);

    return beer;
  }

  async listBeers() {
    return dbBeers;
  }

  async updateBeer(beer: Beer, beerId: string) {
    let updatedBeer = undefined;

    dbBeers.forEach((oldBeer, idx, beersArray) => {
      if (oldBeer.id === beerId) {
        beersArray[idx] = { ...oldBeer, ...beer };
        updatedBeer = beersArray[idx];
      }
    });

    return updatedBeer;
  }
}
