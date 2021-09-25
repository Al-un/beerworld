import { mount } from "@vue/test-utils";

import About from "./About";

let wrapper;

describe("views/About", () => {
  it("renders and match snapshot", () => {
    wrapper = mount(About);

    expect(wrapper).toMatchSnapshot();
  });
});
