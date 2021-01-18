import { USE_SHADOW_DOM } from '@bw/constants';
import { attachCustomElementNode } from '@bw/utils';

export abstract class BaseCustomElement extends HTMLElement {
  // --------------------------------------------------------------------------
  //  Properties
  // --------------------------------------------------------------------------
  /**
   * Flag to avoid re-rendering component
   */
  rendered: boolean = false;
  /**
   * If defined, and if shadow DOM is used, the style from this path is loaded
   * and prepended to the shadow root content
   */
  styleFilePath: string | undefined = undefined;
  /**
   * Define if this component should use Shadow DOM
   */
  useShadowDOM: boolean = USE_SHADOW_DOM;

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  async connectedCallback() {
    await this.renderRoot();

    const childrenNodes = await this.renderChildren();
    await attachCustomElementNode(this, childrenNodes);
  }
  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  async renderRoot(): Promise<void> {}

  async renderChildren(): Promise<HTMLElement | HTMLElement[]> {
    return [];
  }
}
