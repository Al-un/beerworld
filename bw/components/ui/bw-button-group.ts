import { BaseCustomElement } from '../base';

export class BwButtonGroup extends BaseCustomElement {
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  get styleFilePath() {
    return 'components/ui/_bw-button-group.scss';
  }
  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    return this.addSlot() || [];
  }
}
