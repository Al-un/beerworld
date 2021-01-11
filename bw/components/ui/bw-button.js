import "../../styles/components/ui/_bw-button.scss";
import { addSlotFromCustomElement, attachCustomElementNode } from "../../utils";

class BwButton extends HTMLElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  // --------------------------------------------------------------------------
  //  Getters / Setters
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  render() {
    const el = document.createElement("button");
    el.classList.add("bw-button");

    // icon
    if (this.hasAttribute("icon")) {
      const elIcon = document.createElement("img");
      elIcon.alt = "icon";
      elIcon.classList.add("icon");
      elIcon.src = this.getAttribute("icon");
      el.appendChild(elIcon);
    }

    // Text via slot
    const elText = document.createElement("span");
    elText.classList.add("text");
    addSlotFromCustomElement(this, elText);
    el.appendChild(elText);

    // Attach to DOM
    attachCustomElementNode(this, el);
  }
}

customElements.define("bw-button", BwButton);
