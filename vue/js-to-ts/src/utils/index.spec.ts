import { add } from "./";

describe("utils/add", () => {
  it("works", () => {
    const output = add(4, 3);
    expect(output).toBe(7);
  });
});
