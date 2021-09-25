import { mount } from "@vue/test-utils";

import Home from "./Home";

let wrapper;

let mockDispatch = jest.fn(() => Promise.resolve(true));

describe("views/Home", () => {
  beforeEach(() => {
    wrapper = mount(Home, {
      mocks: {
        $store: { dispatch: mockDispatch },
      },
      computed: {
        beers() {
          return [];
        },
        loadingBeers() {
          return false;
        },
      },
    });
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches the beers", () => {
    expect(mockDispatch).toHaveBeenCalledWith("beers/fetchBeers");
  });
});
