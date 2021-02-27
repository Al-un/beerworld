import style from "./some-box.scss";

class SomeBox extends HTMLElement {
  constructor() {
    super();

    this._input = undefined;
  }

  get title() {
    return this.getAttribute("title") || "No title";
  }

  set title(title) {
    this.setAttribute("title", title);
  }

  get value() {
    return this.getAttribute("value") || "No value";
  }

  set value(value) {
    this.setAttribute("value", value);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
    <style>${style}</style>

    <div><h1 class="title">${this.title}</h1>
    <div class="description">
        <slot></slot>
    </div>
    <input class="input" value="${this.value}" /></div>`;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._input = this.shadowRoot.querySelector("input");
    this._input.addEventListener("input", (e) => {
      this.value = e.target.value;
      this.dispatchEvent(
        new CustomEvent("some.input", {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("some-box", SomeBox);
