import { BaseCustomElement } from '@bw/components/base';

const ATTR_OPENED = 'opened';

export class BwNavDrawer extends BaseCustomElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'layouts/_bw-nav-drawer.scss';
  }

  async connectedCallback() {
    await super.connectedCallback();

    // --- Open state
    if (this.hasAttribute(ATTR_OPENED)) {
      this.openMenu();
    }
  }

  attributeChangedCallback() {
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
    return ['opened'];
  }

  get opened() {
    return this.hasAttribute(ATTR_OPENED);
  }

  set opened(val) {
    if (val) {
      this.setAttribute(ATTR_OPENED, '');
    } else {
      this.removeAttribute(ATTR_OPENED);
    }
  }

  // --------------------------------------------------------------------------
  //  Methods
  // --------------------------------------------------------------------------
  closeMenu() {
    this.$setOpenClass(false);
    this.dispatchEvent(new CustomEvent('closed'));
  }

  openMenu() {
    this.$setOpenClass(true);
    this.dispatchEvent(new CustomEvent('zzzz'));
  }

  $setOpenClass(opened: boolean) {
    const backdrop = this.querySelect(`#bw-nav-backdrop`);
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
  buildRoot() {
    this.id = 'bw-nav-drawer';
    this.classList.add('bw-nav-drawer');
  }

  buildChildren() {
    let elements: HTMLElement[] = [];

    // --- Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'bw-nav-backdrop';
    backdrop.classList.add('bw-nav-backdrop');
    backdrop.addEventListener('click', () => (this.opened = false));

    // --- Nav panel
    const navPanel = document.createElement('aside');
    navPanel.id = 'bw-nav-panel';
    navPanel.classList.add('bw-nav-panel');

    // Logo
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.textContent = 'LOGO here';
    navPanel.appendChild(logo);

    const navMenu = document.createElement('nav');
    navMenu.classList.add('bw-list');
    const links = [
      { title: 'Home', icon: '', href: 'index.html' },
      { title: 'About', icon: '', href: 'about.html' },
    ];
    links.forEach((link) => {
      const elLink = document.createElement('a');
      elLink.href = link.href;

      const elLinkText = document.createElement('span');
      elLinkText.textContent = link.title;
      elLink.appendChild(elLinkText);

      navMenu.appendChild(elLink);
    });
    navPanel.appendChild(navMenu);

    elements = [navPanel, backdrop];

    // --- Attach to DOM
    return elements;
  }
}
