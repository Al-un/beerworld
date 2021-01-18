import { addSlotFromCustomElement, attachCustomElementNode } from '../../utils';
import { BaseCustomElement } from '../base';

(function () {
  class BwButton extends BaseCustomElement {
    // --------------------------------------------------------------------------
    //  Lifecycle
    // --------------------------------------------------------------------------
    constructor() {
      super();

      this.styleFilePath = 'components/ui/_bw-button.scss';
      this.useShadowDOM = true;
    }

    // --------------------------------------------------------------------------
    //  Render
    // --------------------------------------------------------------------------
    async renderChildren() {
      const el = document.createElement('button');
      el.classList.add('bw-button');

      // icon
      if (this.hasAttribute('icon')) {
        const elIcon = document.createElement('img');
        elIcon.alt = 'icon';
        elIcon.classList.add('icon');
        elIcon.src = this.getAttribute('icon');
        el.appendChild(elIcon);
      }

      // Text via slot
      const elText = document.createElement('span');
      elText.classList.add('text');
      addSlotFromCustomElement(this, elText, true);
      el.appendChild(elText);

      // Attach to DOM
      return el;
    }
  }

  customElements.define('bw-button', BwButton);
})();
