import { html } from "lit-html";
import "./some-box";

export default {
  title: "Plop/Some Box",
  component: "some-box",
};

export const Base = ({ title, value }) =>
  html`<some-box .title=${title} .value=${value}
    >Some default slot here</some-lit-box
  >`;
Base.args = {
  title: "A basic title",
  value: "A basic value",
};
