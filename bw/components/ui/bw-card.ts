// import { addSlotFromCustomElement, attachCustomElementNode } from '../../utils';

import { BaseCustomElement } from '../base';

(function () {
  class BwCard extends BaseCustomElement {
    // --------------------------------------------------------------------------
    //  Lifecycle
    // --------------------------------------------------------------------------
    constructor() {
      super();

      this.styleFilePath = 'components/ui/_bw-card.scss';
    }

    // --------------------------------------------------------------------------
    //  Render
    // --------------------------------------------------------------------------
    async renderRoot() {
      this.classList.add('bw-card');

      if (this.hasAttribute('padded')) {
        this.classList.add('padded');
      }
    }
    async renderChildren() {
      return this.useShadowDOM ? [document.createElement('slot')] : [];
    }
  }

  customElements.define('bw-card', BwCard);
})();
