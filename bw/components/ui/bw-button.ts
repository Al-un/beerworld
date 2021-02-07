import { BaseCustomElement } from '../base';

export interface BwButtonAttrs {
  disabled?: boolean;
  icon?: string;
  solid?: boolean;
  outline?: boolean;
}

export class BwButton extends BaseCustomElement {
  _button?: HTMLButtonElement = undefined;

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'components/ui/_bw-button.scss';
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute('disabled', '');
      if (this._button) this._button.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
      if (this._button) this._button.removeAttribute('disabled');
    }
  }

  get fill(): 'solid' | 'outline' {
    if (this.hasAttribute('solid')) {
      return 'solid';
    } else if (this.hasAttribute('outline')) {
      return 'outline';
    }

    // solid by default
    return 'solid';
  }

  set fill(val: 'solid' | 'outline') {
    if (val === 'solid') {
      this.removeAttribute('outline');
      this.setAttribute('solid', '');
    } else if (val === 'outline') {
      this.removeAttribute('solid');
      this.setAttribute('outline', '');
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    const el = document.createElement('button');
    el.classList.add('bw-button');

    // props
    if (this.disabled) {
      el.setAttribute('disabled', '');
    }
    if (this.fill) {
      el.classList.add(this.fill);
    }

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
    this.addSlot(elText);
    el.appendChild(elText);

    this._button = el;

    // Attach to DOM
    return el;
  }
}
