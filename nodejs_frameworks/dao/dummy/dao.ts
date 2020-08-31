import { Beer, Country, DAO } from "../models";
import { mockBeers, mockCountries, generateMockBeerId } from "./mock-data";

let dbBeers = mockBeers;
let dbCountries = mockCountries;

export class DummyDao implements DAO {
  createBeer(beer: Beer) {
    beer.id = generateMockBeerId(dbBeers);
    dbBeers = [...dbBeers, beer];

    return beer;
  }

  deleteBeer(beerId: string) {
    const oldLength = dbBeers.length;
    dbBeers = dbBeers.filter((b) => b.id !== beerId);
    const newLength = dbBeers.length;

    return oldLength - newLength;
  }

  getBeer(beerId: string) {
    const beer = dbBeers.find((b) => b.id === beerId);

    return beer;
  }

  listBeers() {
    return dbBeers;
  }

  updateBeer(beer: Beer, beerId: string) {
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
