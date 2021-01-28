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
  useShadowDOM: boolean = true;

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  async connectedCallback(): Promise<void> {
    await this.render();
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
    if (this.useShadowDOM) {
      const slot = document.createElement('slot');
      if (name) slot.setAttribute('name', name);

      // Return slot to be appended at root level
      if (!element) {
        return slot;
      }

      // Nothing to return, an element has a slot
      element.appendChild(slot);
    } else {
      let slottedElements: HTMLElement[] = [];

      // Component initial innerHTML must be deleted as if shadow DOM is
      // not used, the component innerHTML is used to render the content
      // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
      while (this.firstChild) {
        const firstChild = this.firstChild;

        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        switch (firstChild.nodeType) {
          case Node.ELEMENT_NODE:
            if (element) {
              element.appendChild(firstChild.cloneNode(true));
            } else {
              slottedElements = [
                ...slottedElements,
                firstChild.cloneNode(true) as HTMLElement,
              ];
            }

            firstChild.remove();
            break;
          case Node.TEXT_NODE:
            if (element) {
              element.appendChild(firstChild.cloneNode(true));
            } else {
              const span = document.createElement('span');
              span.appendChild(firstChild.cloneNode(true));
              slottedElements = [...slottedElements, span];
            }

            firstChild.remove();
            break;
        }
      }

      if (slottedElements.length) return slottedElements;
    }
  }

  /**
   *
   * @param selector
   */
  querySelect(selector: string): HTMLElement | null {
    if (this.useShadowDOM) {
      return this.shadowRoot
        ? this.shadowRoot.querySelector(selector)
        : undefined;
    }

    return this.querySelector(selector);
  }

  querySelectAll(selector: string): NodeListOf<Element> {
    if (this.useShadowDOM) {
      return this.shadowRoot
        ? this.shadowRoot.querySelectorAll(selector)
        : undefined;
    }

    return this.querySelectorAll(selector);
  }
  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  /**
   * Render the custom element by
   * - updating the root node
   * - appending the children
   */
  async render(): Promise<void> {
    await this.buildRoot();

    const children = await this.buildChildren();
    this.attachChildren(children);
  }

  /**
   * Any update applied to the root node should be defined here. This method is
   * called before appending children
   */
  async buildRoot(): Promise<void> {}

  /**
   * Build the child or children node without having them appended to the
   * root node
   */
  async buildChildren(): Promise<HTMLElement | HTMLElement[]> {
    return [];
  }

  /**
   * Either attach the built component to a shadow DOM or directly as a child
   * of a custom element
   */
  async attachChildren(element: HTMLElement | HTMLElement[]) {
    // Modify custom element children
    if (!this.useShadowDOM) {
      this.childNodes.forEach((c) => c.remove());

      const children = Array.isArray(element) ? element : [element];
      children.forEach((c) => {
        this.appendChild(c);
      });
      return;
    }

    // Use shadow DOM
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // Styling
    const getStyle = async (path: string): Promise<HTMLStyleElement> => {
      let scss = undefined;
      const pathSplit = path.split('/');
      const subPath = pathSplit.slice(1).join('/');

      switch (path.split('/')[0]) {
        case 'components':
          scss = require(`!css-loader!postcss-loader!sass-loader!@bw/styles/components/${subPath}`);
          break;
        case 'layouts':
          scss = require(`!css-loader!postcss-loader!sass-loader!@bw/styles/layouts/${subPath}`);
          break;
        default:
          throw new Error(`Invalid SCSS file path ${path}`);
      }
      const styleContent = scss.default[0][1];

      const style = document.createElement('style');
      style.textContent = styleContent;

      return style;
    };
    if (this.styleFilePath) {
      const style = await getStyle(this.styleFilePath);
      shadowRoot.appendChild(style);
    }

    if (Array.isArray(element)) {
      element.forEach((e) => shadowRoot.appendChild(e));
    } else {
      shadowRoot.appendChild(element);
    }
  }
}
