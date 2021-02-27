import { html } from "lit-html";
import { SomeLitText } from "./some-lit-text";

export default {
  title: "Plop/Some Lit Text",
  argTypes: {
    pouet: { control: "text" },
  },
};

const Template = (args) => new SomeLitText(args);

const plop = (pouet) => html`
  <div>
    <h1 .prout="${pouet}">H1 title</h1>
    <p>Body ${pouet}</p>
  </div>
`;

export const Default = Template.bind({});

export const Pouet = (() => `<div>Some plain html</div>`).bind({});

export const Plop = (({ pouet }) => {
  const res = plop(pouet);
  return res;
}).bind({});
