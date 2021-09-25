import {
  Action,
  config,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

import { Beer } from "@/models/beers";

// Module-level configuration
config.rawError = true;

@Module({ name: "beers", namespaced: true, stateFactory: true })
export default class BeerModule extends VuexModule {
  beers: Beer[] = [];
  loading = false;

  @Action
  async fetchBeers(): Promise<void> {
    this.context.commit("setLoading", true);

    const data = await fetch(
      "https://raw.githubusercontent.com/Al-un/beerworld/media/mocks/beers.json",
      { method: "GET", mode: "cors" }
    );
    const beers = await data.json();

    this.context.commit("setBeers", beers);

    this.context.commit("setLoading", false);
  }

  @Mutation
  setBeers(beers: Beer[]): void {
    this.beers = beers;
  }

  @Mutation
  setLoading(loading: boolean): void {
    this.loading = loading;
  }
}
