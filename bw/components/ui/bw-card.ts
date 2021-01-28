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
    async buildRoot() {
      this.classList.add('bw-card');

      if (this.hasAttribute('padded')) {
        this.classList.add('padded');
      }
    }
    async renderChildren() {
      return this.addSlot() || [];
    }
  }

  customElements.define('bw-card', BwCard);
})();
