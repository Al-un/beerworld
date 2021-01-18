import { BaseCustomElement } from '../base';

(function () {
  customElements.define(
    'bw-button-group',
    class extends BaseCustomElement {
      // --------------------------------------------------------------------------
      //  Lifecycle
      // --------------------------------------------------------------------------
      constructor() {
        super();
        this.styleFilePath = 'components/ui/_bw-button-group.scss';
      }

      // --------------------------------------------------------------------------
      //  Render
      // --------------------------------------------------------------------------
      async renderRoot() {
        this.classList.add('bw-button-group');
      }
      async renderChildren() {
        return this.useShadowDOM ? [document.createElement('slot')] : [];
      }
    }
  );
})();
