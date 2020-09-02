/* ========================================================================= */
//    DAO layer
/* ========================================================================= */
/**
 * DAO common structure
 */
export interface DAO {
  createBeer: (beer: Beer) => Beer;

  deleteBeer: (beerId: string) => number;

  getBeer: (beerId: string) => Beer | undefined;

  listBeers: () => Beer[];

  updateBeer: (beer: Beer, beerId: string) => Beer | undefined;
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
