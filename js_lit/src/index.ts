import "./some-lit-text.js";
import "./some-text.js";
import "./some-lit-box.js";
import "./some-box.js";
import "./some-lit-ts-box.ts";

const someOutput = document.querySelector("#some-output");
const someBox = document.querySelector("some-box");
const someLitBox = document.querySelector("some-lit-box");
const someLitTsBox = document.querySelector("some-lit-ts-box");

someLitBox.addEventListener("some.input", (e: CustomEvent) => {
  someOutput.textContent = `${JSON.stringify(
    e.detail,
    null,
    2
  )}\n\nLit Value: ${e.detail.value}`;
});

someBox.addEventListener("some.input", (e: CustomEvent) => {
  someOutput.textContent = `${JSON.stringify(e.detail, null, 2)}\n\nValue: ${
    e.detail.value
  }`;
});

someLitTsBox.addEventListener("some.input", (e: CustomEvent) => {
  someOutput.textContent = `${JSON.stringify(
    e.detail,
    null,
    2
  )}\n\nLit TS Value: ${e.detail.value}`;
});
