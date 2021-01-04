import "../styles/layouts/_bw-nav-drawer.scss";
import "../styles/layouts/_bw-nav-menu.scss";
import { attachCustomElementNode, USE_SHADOW_DOM } from "../utils";

const ATTR_OPENED = "opened";

class BwNavMenu extends HTMLElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  connectedCallback() {
    this.$render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this.opened) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  // --------------------------------------------------------------------------
  //  Getters / Setters
  // --------------------------------------------------------------------------
  static get observedAttributes() {
    return ["opened"];
  }

  get opened() {
    return this.hasAttribute(ATTR_OPENED);
  }

  set opened(val) {
    if (val) {
      this.setAttribute(ATTR_OPENED, "");
    } else {
      this.removeAttribute(ATTR_OPENED);
    }
  }

  // --------------------------------------------------------------------------
  //  Methods
  // --------------------------------------------------------------------------
  closeMenu() {
    this.$setOpenClass(false);
  }

  openMenu() {
    this.$setOpenClass(true);
  }

  $setOpenClass(opened) {
    const backdrop = USE_SHADOW_DOM
      ? this.shadowRoot
        ? this.shadowRoot.querySelector(`#bw-nav-backdrop`)
        : undefined
      : this.querySelector(`#bw-nav-backdrop`);
    if (!backdrop) {
      return;
    }

    if (opened) {
      this.classList.add(ATTR_OPENED);
      backdrop.classList.add(ATTR_OPENED);
    } else {
      this.classList.remove(ATTR_OPENED);
      backdrop.classList.remove(ATTR_OPENED);
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  $render() {
    let elements = [];
    this.id = "bw-nav-drawer";

    // --- Backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "bw-nav-backdrop";
    backdrop.addEventListener("click", () => this.removeAttribute(ATTR_OPENED));
    elements = [...elements, backdrop];

    // --- Drawer
    const navMenu = document.createElement("nav");
    navMenu.id = "bw-nav-menu";

    elements = [...elements, navMenu];

    // --- Attach to DOM
    attachCustomElementNode(this, elements, USE_SHADOW_DOM);

    // --- Open state
    if (this.hasAttribute(ATTR_OPENED)) {
      this.openMenu();
    }
  }
}

customElements.define("bw-nav-menu", BwNavMenu);
