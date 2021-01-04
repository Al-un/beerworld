import "../../styles/components/ui/_bw-card.scss";
import { addSlotFromCustomElement, attachCustomElementNode } from "../../utils";

class BwCard extends HTMLElement {
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
    this.classList.add("bw-card");

    if (this.hasAttribute("padded")) {
      this.classList.add("padded");
    }
  }
}

customElements.define("bw-card", BwCard);
