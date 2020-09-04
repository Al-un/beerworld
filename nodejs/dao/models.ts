/* ========================================================================= */
//    DAO layer
/* ========================================================================= */
/**
 * DAO common structure
 */
export interface DAO {
  createBeer: (beer: Beer) => Promise<Beer>;

  deleteBeer: (beerId: string) => Promise<number>;

  getBeer: (beerId: string) => Promise<Beer | undefined>;

  listBeers: () => Promise<Beer[]>;

  updateBeer: (beer: Beer, beerId: string) => Promise<Beer | undefined>;
}

/* ========================================================================= */
//    Data model
/* ========================================================================= */
/**
 * Country is represented by a two-letters string
 * @see https://en.wikipedia.org/wiki/ISO_3166-2
 */
export type Country = string;

/**
 * Beer has an unique string ID
 */
export interface Beer {
  id: string;
  name: string;
  country: Country;
}
