import { html } from "lit-html";
import "./some-lit-box";

export default {
  title: "Plop/Some Lit Box",
  component: "some-lit-box",
};

export const Base = ({ title, value }) =>
  html`<some-lit-box .title=${title} .value=${value}
    >Some default slot here</some-lit-box
  >`;
Base.args = {
  title: "A basic title",
  value: "A basic value",
};
