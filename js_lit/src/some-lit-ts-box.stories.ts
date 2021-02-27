import { html } from "lit-html";
import "./some-lit-ts-box";

export default {
  title: "Plop/Some Lit TS Box",
  component: "some-lit-ts-box",
};

export const Base = ({ title, value }: { title: string; value: string }) =>
  html`<some-lit-box .title=${title} .value=${value}
    >Some default slot here</some-lit-box
  >`;
Base.args = {
  title: "A lit TS title",
  value: "A lit TS value",
};
