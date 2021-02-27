import {
  LitElement,
  html,
  customElement,
  property,
  css,
  unsafeCSS,
} from "lit-element";
import style from "./some-box.scss";

@customElement("some-lit-ts-box")
export class SomeLitTsBox extends LitElement {
  @property()
  title = "No title here";

  @property()
  value = "No value here";

  constructor() {
    super();
  }

  static get styles() {
    return css`
      ${unsafeCSS(style)}
    `;
  }

  _onInput(ev: InputEvent) {
    this.value = (ev.target as any).value;
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
