import { BaseCustomElement } from '@bw/components/base';
import { ATTR_BW_APP_ACCESS_TOKEN, LS_ACCESS_TOKEN } from '../constants';
import { logoutUser, decodeAccessToken } from '../utils';

export class BwApp extends BaseCustomElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();

    const accessToken = window.localStorage.getItem(LS_ACCESS_TOKEN);
    if (accessToken !== null) {
      this.setAttribute(ATTR_BW_APP_ACCESS_TOKEN, accessToken);
    }
  }

  get styleFilePath() {
    return 'layouts/_bw-app.scss';
  }

  async connectedCallback() {
    await super.connectedCallback();

    this.updateUserLoginArea();
  }

  attributeChangedCallback(attrName: string) {
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
    const bwNav = this.querySelect(`#bw-nav-drawer`);
    if (!bwNav) {
      return;
    }

    if (bwNav.hasAttribute('opened')) {
      bwNav.removeAttribute('opened');
    } else {
      bwNav.setAttribute('opened', '');
    }
  }

  updateUserLoginArea() {
    const header = this.querySelect('#bw-app-header');
    if (!header) {
      return;
    }

    const removeNode = (id: string) => {
      const element = this.querySelect(id);
      if (element) {
        header.removeChild(element);
      }
    };
    removeNode('bw-login-btn');
    removeNode('bw-logout-btn');
    removeNode('bw-login-greeting');

    if (this.hasAttribute(ATTR_BW_APP_ACCESS_TOKEN)) {
      const userInfo = decodeAccessToken(
        this.getAttribute(ATTR_BW_APP_ACCESS_TOKEN)
      );
      const userName = document.createElement('div');
      userName.id = 'bw-login-greeting';
      userName.classList.add('bw-login-greeting');
      userName.textContent = `Hey <${userInfo.name}> !`;
      header.appendChild(userName);

      const logoutBtn = document.createElement('bw-button');
      logoutBtn.addEventListener('click', () => this.logout());
      logoutBtn.id = 'bw-logout-btn';
      logoutBtn.classList.add('bw-logout-btn');
      logoutBtn.textContent = 'Logout';

      header.appendChild(logoutBtn);
    } else {
      const loginBtn = document.createElement('bw-button');
      loginBtn.addEventListener('click', () => {
        window.location.assign('login.html');
      });
      loginBtn.id = 'bw-login-btn';
      loginBtn.classList.add('bw-login-btn');
      loginBtn.textContent = 'Login';

      header.appendChild(loginBtn);
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildRoot() {
    this.id = 'bw-app';
    this.classList.add('bw-app');
  }

  buildChildren() {
    let elements: HTMLElement[] = [];

    // --- Menu
    const bwNavDrawer = document.createElement('bw-nav-drawer');
    // bwNavDrawer.setAttribute('opened', '');
    bwNavDrawer.addEventListener('zzzz', () => console.log("IT'S OPENED!!"));
    bwNavDrawer.addEventListener('closed', () => console.log("IT'S CLOSED!!"));
    elements = [...elements, bwNavDrawer];

    // --- Header
    const header = document.createElement('header');
    header.id = 'bw-app-header';
    header.classList.add('bw-app-header');

    const toggler = document.createElement('bw-hamburger');
    toggler.id = 'bw-nav-menu-toggler';
    toggler.classList.add('bw-nav-menu-toggler');
    toggler.addEventListener('click', () => this.toggleMenu());
    header.appendChild(toggler);

    const flexSpacer = document.createElement('bw-flex-spacer');
    header.appendChild(flexSpacer);

    elements = [...elements, header];

    // --- Main content
    const main = document.createElement('main');
    main.id = 'bw-app-content';
    main.classList.add('bw-app-content');
    this.addSlot(main);
    elements = [...elements, main];

    // --- Footer
    const footer = document.createElement('footer');
    footer.id = 'bw-app-footer';
    footer.classList.add('bw-app-footer');
    elements = [...elements, footer];

    // --- Attach to DOM
    return elements;
  }
}
