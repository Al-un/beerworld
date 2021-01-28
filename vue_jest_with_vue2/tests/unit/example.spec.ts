import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

console.error = jest.fn();

afterEach(() =>{
  expect(console.error).not.toHaveBeenCalled();
})

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it("prout", () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg: "new message" }
    });

    const btn = wrapper.find('button');
    expect(btn).toBeDefined();

    btn.trigger('click');
  })
});
