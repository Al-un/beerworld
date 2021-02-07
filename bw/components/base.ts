export interface IBaseCustomElement {
  styleFilePath: string | undefined;
  customName: string;
}

export abstract class BaseCustomElement
  extends HTMLElement
  implements IBaseCustomElement {
  // --------------------------------------------------------------------------
  //  Properties
  // --------------------------------------------------------------------------
  /**
   * Flag to avoid re-rendering component
   */
  rendered: boolean = false;
  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  async connectedCallback() {
    // Update root node
    this.buildRoot();

    // Initialise shadow DOM
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Attach elements
    const children = this.buildChildren();
    if (Array.isArray(children)) {
      children.forEach((c) => shadowRoot.appendChild(c));
    } else {
      shadowRoot.appendChild(children);
    }

    // Styles
    const styleNode = await this.buildStyle();
    if (styleNode) {
      shadowRoot.prepend(styleNode);
    }
  }

  // --------------------------------------------------------------------------
  //  Get/Set
  // --------------------------------------------------------------------------
  get styleFilePath(): string | undefined {
    return undefined;
  }

  get customName(): string {
    return this.constructor.name;
  }

  // --------------------------------------------------------------------------
  //  Children management:
  //  All methods to build the children list and manage children once the
  //  component is rendered
  // --------------------------------------------------------------------------
  /**
   * Add slot or workaround when not using shadow DOM
   *
   * @param element Element to add the slot in. If undefined, the slot element(s)
   * is/are returned
   * @param name optional slot name
   *
   * @returns slot or slotted elements if it has to be appended to the root node
   */
  addSlot(
    element?: HTMLElement,
    name?: string
  ): HTMLElement | HTMLElement[] | undefined {
    const slot = document.createElement('slot');
    if (name) slot.setAttribute('name', name);

    // Return slot to be appended at root level
    if (!element) {
      return slot;
    }

    // Nothing to return, an element has a slot
    element.appendChild(slot);
  }

  copyAttrTo(target: HTMLElement, ...attrs: string[]) {
    attrs.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        target.setAttribute(attr, this.getAttribute(attr));
      }
    });
  }

  getSlot(name?: string): NodeListOf<Element> {
    return name
      ? this.querySelectorAll(`[slot='${name}']`)
      : this.querySelectorAll(`:not([slot])`);
  }

  /**
   *
   * @param name slot name. If undefined, this method searches for the default
   * slot
   */
  hasSlot(name?: string): boolean {
    // Named slot
    if (name) {
      const hasNamedSlot = this.querySelector(`[slot='${name}']`);
      return !!hasNamedSlot;
    }

    // Default slot:
    // Option 1: at least one HTMLelement with no "slot" attribute
    const hasDefaultSlot = this.querySelector(`:not([slot])`);
    if (!!hasDefaultSlot) return true;
    // Option 2: at least a non empty text node
    for (let i = 0; i < this.childNodes.length; i++) {
      const child = this.childNodes.item(i);
      if (child.nodeType !== Node.TEXT_NODE) {
        continue;
      }

      if (child.textContent) {
        return true;
      }
    }
  }

  /**
   *
   * @param selector
   */
  querySelect(selector: string): HTMLElement | null {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : undefined;
  }

  querySelectAll(selector: string): NodeListOf<Element> {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : undefined;
  }
  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  /**
   * Any update applied to the root node should be defined here. This method is
   * called before appending children
   */
  buildRoot(): void {}

  /**
   * Build the child or children node without having them appended to the
   * root node
   */
  buildChildren(): HTMLElement | HTMLElement[] {
    return [];
  }

  async buildStyle(): Promise<HTMLStyleElement | undefined> {
    if (!this.styleFilePath) {
      return undefined;
    }

    let scss = undefined;
    const pathSplit = this.styleFilePath.split('/');
    const subPath = pathSplit.slice(1).join('/');

    switch (this.styleFilePath.split('/')[0]) {
      case 'components':
        scss = require(`!css-loader!postcss-loader!sass-loader!@bw/styles/components/${subPath}`);
        break;
      case 'layouts':
        scss = require(`!css-loader!postcss-loader!sass-loader!@bw/styles/layouts/${subPath}`);
        break;
      default:
        throw new Error(`Invalid SCSS file path ${this.styleFilePath}`);
    }
    const styleContent = scss.default[0][1];

    const style = document.createElement('style');
    style.textContent = styleContent;

    return style;
  }

  buildStyleFromAttr(attrName: string): string | undefined {
    return this.hasAttribute(attrName)
      ? `style="${this.getAttribute(attrName)}"`
      : '';
  }

  buildFromString(html: string): HTMLElement | HTMLElement[] {
    const template = document.createElement('template');
    template.innerHTML = html;

    return template.content.cloneNode(true) as HTMLElement | HTMLElement[];
  }
}
