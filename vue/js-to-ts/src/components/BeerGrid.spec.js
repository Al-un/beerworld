import { mount } from "@vue/test-utils";

import BeerGrid from "./BeerGrid";

let wrapper;

const mockBeers = [
  { name: "beer1", mainPicture: "mainPic1" },
  { name: "beer2", mainPicture: "mainPic2" },
];

describe("components/BeerGrid", () => {
  it.each([
    ["When loading", true, mockBeers],
    ["When not loading", false, mockBeers],
    ["When beers list is empty", false, []],
  ])("renders and matches snapshot %s", (_, loading, beers) => {
    wrapper = mount(BeerGrid, {
      propsData: { beers, loading },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
