import { getModule } from "vuex-module-decorators";

import BeerModule from "./beers";

type Store = Parameters<typeof getModule>[1];

export function beerModule(store: Store): BeerModule {
  return getModule<BeerModule>(BeerModule, store);
}
