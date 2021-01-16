import { Beer, BeerAPI, BeerShortInfo, PrimaryKey } from '@bw/types';
import { generateDelay, isMockApi } from './utils';

const MOCK_BEERS =
  'https://raw.githubusercontent.com/Al-un/beerworld/media/mocks/beers.json';

class MockBeersAPI implements BeerAPI {
  async fetchBeers() {
    const data = await fetch(MOCK_BEERS);
    const beers: BeerShortInfo[] = await data.json();

    return new Promise<BeerShortInfo[]>((resolve) => {
      setTimeout(() => resolve(beers), generateDelay());
    });
  }

  async fetchBeer(beerId: PrimaryKey) {
    const beers = await this.fetchBeers();
    const beer = beers.find((b: BeerShortInfo) => b.id === beerId);

    return new Promise<Beer>((resolve) => {
      setTimeout(() => resolve(beer as Beer), generateDelay());
    });
  }

  async cheerBeer(beerId: PrimaryKey) {
    console.log(`[API] Cheer beer ${beerId}`);
  }

  async drinkBeer(beerId: PrimaryKey, userId: PrimaryKey) {
    console.log(`[API] User ${userId} has drunk beer ${beerId}`);
  }
}

class RealBeersAPI implements BeerAPI {
  async fetchBeers(): Promise<never> {
    throw new Error('Not implemented');
  }

  async fetchBeer(_: PrimaryKey): Promise<never> {
    throw new Error('Not implemented');
  }

  async cheerBeer(_: PrimaryKey) {
    throw new Error('Not implemented');
  }

  async drinkBeer(_: PrimaryKey, __: PrimaryKey) {
    throw new Error('Not implemented');
  }
}

const beerApi = isMockApi() ? new MockBeersAPI() : new RealBeersAPI();
export default beerApi;
