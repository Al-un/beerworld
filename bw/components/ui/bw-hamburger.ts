import { attachCustomElementNode } from '../../utils';
import { BaseCustomElement } from '../base';

(function () {
  class BwHamburger extends BaseCustomElement {
    // --------------------------------------------------------------------------
    //  Lifecycle
    // --------------------------------------------------------------------------
    constructor() {
      super();

      this.styleFilePath = 'components/ui/_bw-hamburger.scss';
    }

    // --------------------------------------------------------------------------
    //  Render
    // --------------------------------------------------------------------------
    async renderRoot() {
      this.addEventListener('click', () => {
        this.classList.toggle('closed');
        this.shadowRoot.querySelector('div').classList.toggle('closed');
      });
    }

    async renderChildren() {
      let children: HTMLElement[] = [];

      // elements = [...elements, document.createElement("div")]
      // elements = [...elements, document.createElement("div")]
      // elements = [...elements, document.createElement("div")]

      const x = document.createElement('div');
      x.textContent = 'X';
      children = [...children, x];

      return children;
    }
  }

  customElements.define('bw-hamburger', BwHamburger);
})();