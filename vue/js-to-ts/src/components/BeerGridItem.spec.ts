import { mount } from "@vue/test-utils";

import BeerGridItem from "./BeerGridItem.vue"; // .vue extension required here

let wrapper;

describe("components/BeerGridItem", () => {
  it("renders and match snapshot", () => {
    wrapper = mount(BeerGridItem, {
      propsData: {
        beer: { name: "beer1", mainPicture: "mainPic1" },
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
