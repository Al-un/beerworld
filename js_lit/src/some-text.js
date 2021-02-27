class SomeText extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `<div>Some text here</div>`;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("some-text", SomeText);
