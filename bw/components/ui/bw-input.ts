import { BaseCustomElement } from '../base';

export class BwInputAttrs {
  error?: string;
  label: string;
  value: string | number;
}

export class BwInput extends BaseCustomElement {
  input?: HTMLInputElement;
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'components/ui/_bw-input.scss';
  }

  get value(): string | undefined {
    return this.input ? this.input.value : undefined;
  }

  set(value: string) {
    if (this.input) {
      this.input.value = value;
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildRoot() {
    if (this.getAttribute('error')) {
      this.classList.add('error');
    }
  }
  buildChildren() {
    const label = document.createElement('label');
    label.textContent = this.getAttribute('label');

    const input = document.createElement('input');
    this.copyAttrTo(
      input,
      'name',
      'type',
      'disabled',
      'auto-focus',
      'required',
      'value'
    );
    input.value = this.getAttribute('value');
    this.input = input;

    const errorMsg = document.createElement('div');
    errorMsg.classList.add('error');
    errorMsg.textContent = this.getAttribute('error');

    return [label, input, errorMsg];
  }
}
