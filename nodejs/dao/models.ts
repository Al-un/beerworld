/* ========================================================================= */
//    DAO layer
/* ========================================================================= */
/**
 * DAO common structure
 */
export interface DAO {
  beer: BeerDAO;
  // country: CountryDAO
}

/**
 * @type E: Entity type
 * @type I: Enttiy ID type
 */
interface CrudDao<E, I> {
  create: (entity: E) => Promise<E>;
  delete: (entityId: I) => Promise<number>;
  get: (entityId: I) => Promise<E | undefined>;
  list: () => Promise<E[]>;
  update: (entity: E, entityId: I) => Promise<E | undefined>;
}

export interface BeerDAO extends CrudDao<Beer, string> {}
export interface CountryDAO extends CrudDao<Country, string> {}

/* ========================================================================= */
//    Data model
/* ========================================================================= */
/**
 * Country is represented by a two-letters string
 * @see https://en.wikipedia.org/wiki/ISO_3166-2
 */
export type CountryCode = string;

/**
 * Countries is identified by an unique code
 */
export interface Country {
  code: CountryCode;
}

/**
 * Beer has an unique string ID
 */
export interface Beer {
  id: string;
  name: string;
  country: CountryCode;
}
