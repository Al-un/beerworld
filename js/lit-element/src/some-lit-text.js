import { LitElement, html, css, unsafeCSS } from "lit-element";
// import scssSomeLitText from "./some-lit-text.scss";

export class SomeLitText extends LitElement {
  static get styles() {
    // return css`${unsafeCSS(scssSomeLitText.toString())}`
    return css`
      #pouet {
        background-color: purple;
        color: white;
        padding: 8px;
      }
    `;
  }

  render() {
    // console.log("SCSS", scssSomeLitText);
    // console.log("SCSS", scssSomeLitText.toString());
    return html`<div id="pouet">Some Lit text here</div>`;
  }
}

customElements.define("some-lit-text", SomeLitText);
