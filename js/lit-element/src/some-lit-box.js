import { LitElement, html, css, unsafeCSS } from "lit-element";
import style from "./some-box.scss";

export class SomeLitBox extends LitElement {
  constructor() {
    super();

    this.title = this.title || "No title here";
    this.value = this.value || "No value here";
  }

  static get properties() {
    return {
      title: { type: String },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      ${unsafeCSS(style)}
    `;
  }

  _onInput(ev) {
    this.value = ev.target.value;
    this.dispatchEvent(
      new CustomEvent("some.input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html` <h1 class="title">${this.title}</h1>
      <div class="description">
        <slot></slot>
      </div>
      <input class="input" value="${this.value}" @input="${this._onInput}" />`;
  }
}
customElements.define("some-lit-box", SomeLitBox);
