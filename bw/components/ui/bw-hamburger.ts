import { BaseCustomElement } from '../base';

export class BwHamburger extends BaseCustomElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'components/ui/_bw-hamburger.scss';
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildRoot() {
    this.addEventListener('click', () => {
      this.classList.toggle('closed');
      this.shadowRoot.querySelector('div').classList.toggle('closed');
    });
  }

  buildChildren() {
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
