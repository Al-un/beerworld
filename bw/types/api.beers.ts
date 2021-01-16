import { PrimaryKey } from './aliases';
import { Beer, BeerShortInfo } from './data.beers';

export interface BeerAPI {
  fetchBeers: () => Promise<BeerShortInfo[]>;
  fetchBeer: (beerId: PrimaryKey) => Promise<Beer>;
  cheerBeer: (beerId: PrimaryKey) => Promise<void>;
  drinkBeer: (beerId: PrimaryKey, userId: PrimaryKey) => Promise<void>;
}
