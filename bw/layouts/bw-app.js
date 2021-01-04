import "../styles/layouts/_bw-app.scss";

import { ATTR_BW_APP_ACCESS_TOKEN } from "../constants";
import {
  addSlotFromCustomElement,
  attachCustomElementNode,
  USE_SHADOW_DOM,
  logoutUser,
} from "../utils";

class BwApp extends HTMLElement {
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
    if (attrName === ATTR_BW_APP_ACCESS_TOKEN) {
      this.updateUserLoginArea();
    }
  }

  // --------------------------------------------------------------------------
  //  Getters / Setters
  // --------------------------------------------------------------------------
  static get observedAttributes() {
    return [ATTR_BW_APP_ACCESS_TOKEN];
  }

  // --------------------------------------------------------------------------
  //  Methods
  // --------------------------------------------------------------------------
  logout() {
    logoutUser();
    this.removeAttribute(ATTR_BW_APP_ACCESS_TOKEN);
  }

  toggleMenu() {
    const bwNav = USE_SHADOW_DOM
      ? this.shadowRoot.querySelector(`#bw-nav-drawer`)
      : this.querySelector(`#bw-nav-drawer`);
    if (!bwNav) {
      return;
    }

    if (bwNav.hasAttribute("opened")) {
      bwNav.removeAttribute("opened");
    } else {
      bwNav.setAttribute("opened", "");
    }
  }

  updateUserLoginArea() {
    const userInfoArea = USE_SHADOW_DOM
      ? this.shadowRoot.querySelector("#bw-user-info-area")
      : this.querySelector("#bw-user-info-area");
    userInfoArea.innerHTML = "";

    if (!this.hasAttribute(ATTR_BW_APP_ACCESS_TOKEN)) {
      const loginBtn = document.createElement("bw-button");
      loginBtn.addEventListener("click", () => {
        window.location.assign("login.html");
      });
      loginBtn.id = "bw-login-btn";
      loginBtn.textContent = "Login";

      userInfoArea.appendChild(loginBtn);
    } else {
      const logoutBtn = document.createElement("bw-button");
      logoutBtn.addEventListener("click", () => this.logout());
      logoutBtn.id = "bw-logout-btn";
      logoutBtn.textContent = "Logout";

      userInfoArea.appendChild(logoutBtn);
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  $render() {
    this.id = "bw-app";

    let elements = [];

    // --- Menu
    const bwNavMenu = document.createElement("bw-nav-menu");
    bwNavMenu.setAttribute("opened", "");
    elements = [...elements, bwNavMenu];

    // --- Header
    const header = document.createElement("header");
    header.id = "bw-app-header";

    const toggler = document.createElement("bw-hamburger");
    toggler.id = "bw-nav-menu-toggler";
    toggler.addEventListener("click", () => this.toggleMenu());
    header.appendChild(toggler);

    const userInfoArea = document.createElement("div");
    userInfoArea.id = "bw-user-info-area";
    header.appendChild(userInfoArea);

    elements = [...elements, header];

    // --- Main content
    const main = document.createElement("main");
    main.id = "bw-app-content";
    addSlotFromCustomElement(this, main);
    elements = [...elements, main];

    // --- Footer
    const footer = document.createElement("footer");
    footer.id = "bw-app-footer";
    elements = [...elements, footer];

    // --- Attach to DOM
    attachCustomElementNode(this, elements, USE_SHADOW_DOM);

    this.updateUserLoginArea();
  }
}

customElements.define("bw-app", BwApp);
