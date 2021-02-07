import { BaseCustomElement } from '../base';

export interface BwCardAttrs {
  padded?: boolean;
}

export class BwCard extends BaseCustomElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'components/ui/_bw-card.scss';
  }

  get styleHeader(): string | undefined {
    return this.buildStyleFromAttr('style-header');
  }

  get styleFooter(): string | undefined {
    return this.buildStyleFromAttr('style-footer');
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildRoot() {
    if (this.hasAttribute('padded')) {
      this.classList.add('padded');
    }
  }
  buildChildren() {
    const htmlHeader = this.hasSlot('header')
      ? `<header class="card-header" ${this.styleHeader}>` +
        `<slot name="header"></slot>` +
        `</header>`
      : '';
    const htmlFooter = this.hasSlot('footer')
      ? `<footer class="card-footer" ${this.styleFooter}>` +
        `<slot name="footer"></slot>` +
        `</footer>`
      : '';

    return this.buildFromString(
      htmlHeader + `<main class="card-body"><slot></slot></main>` + htmlFooter
    );
  }
}
