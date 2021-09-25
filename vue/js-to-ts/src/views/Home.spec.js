import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import Home from "./Home";
import mockBeerModule from "@tests/mocks/modules/beers";

let wrapper;

let mockDispatch = jest.fn(() => Promise.resolve(true));

let localVue = createLocalVue();
localVue.use(Vuex);

let beerModule = mockBeerModule();

describe("views/Home", () => {
  beforeEach(() => {
    wrapper = mount(Home, {
      // mocks: {
      //   $store: { dispatch: mockDispatch },
      // },
      // computed: {
      //   beers() {
      //     return [];
      //   },
      //   loadingBeers() {
      //     return false;
      //   },
      // },
      localVue,
      store: {
        beers: beerModule,
      },
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches the beers", () => {
    // expect(mockDispatch).toHaveBeenCalledWith("beers/fetchBeers");
    expect(beerModule.fetchBeers).toHaveBeenCalled();
  });
});
