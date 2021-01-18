import { BaseCustomElement } from '../base';

(function () {
  customElements.define(
    'bw-flex-spacer',
    class extends BaseCustomElement {
      constructor() {
        super();
        this.styleFilePath = 'components/ui/_bw-flex-spacer.scss';
      }

      async renderRoot() {
        this.classList.add('bw-flex-spacer');
      }
    }
  );
})();
