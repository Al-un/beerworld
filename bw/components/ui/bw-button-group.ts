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
      async buildRoot() {
        this.classList.add('bw-button-group');
      }

      async buildChildren() {
        return this.addSlot() || [];
      }
    }
  );
})();
