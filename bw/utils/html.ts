import { BaseCustomElement } from '@bw/components/base';
import { USE_SHADOW_DOM } from '@bw/constants';

// ---------- Common HTML elements
export const APP_WRAPPER = document.querySelector('#bw-app-wrapper');
export const APP_NAV_BACKDROP = document.querySelector('#bw-nav-backdrop');
export const APP_NAV_DRAWER = document.querySelector('#bw-nav-drawer');
export const APP_HEADER = document.querySelector('#bw-app-header');
export const APP_CONTENT = document.querySelector('#bw-app-content');
export const APP_FOOTER = document.querySelector('#bw-app-footer');

// ---------- Custom elements

/**
 * Either attach the built component to a shadow DOM or directly as a child
 * of a custom element
 */
export const attachCustomElementNode = async <C extends BaseCustomElement>(
  component: C,
  element: HTMLElement | HTMLElement[]
): Promise<void> => {
  // Modify custom element children
  if (!component.useShadowDOM) {
    component.childNodes.forEach((c) => c.remove());

    const children = Array.isArray(element) ? element : [element];
    children.forEach((c) => {
      component.appendChild(c);
    });
    return;
  }

  // Use shadow DOM
  const shadowRoot = component.attachShadow({ mode: 'open' });
  // Style
  const getStyle = async (path: string): Promise<HTMLStyleElement> => {
    const i = await import(`!!css-loader!sass-loader!../styles/${path}`);
    const styleContent = i.default[0][1];

    const style = document.createElement('style');
    style.textContent = styleContent;

    return style;
  };
  if (component.styleFilePath) {
    const style = await getStyle(component.styleFilePath);
    shadowRoot.appendChild(style);
  }

  if (Array.isArray(element)) {
    element.forEach((e) => shadowRoot.appendChild(e));
  } else {
    shadowRoot.appendChild(element);
  }
};

/**
 * Add slot or workaround when not using shadow DOM
 *
 * @param {HTMLElement} component
 * @param {HTMLElement} element
 * @param {Boolean} useShadow
 */
export const addSlotFromCustomElement = (
  component: HTMLElement,
  element: HTMLElement,
  useShadow: boolean = USE_SHADOW_DOM
): void => {
  if (useShadow) {
    element.appendChild(document.createElement('slot'));
  } else {
    // Component initial innerHTML must be deleted as if shadow DOM is
    // not used, the component innerHTML is used to render the content
    // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    while (component.firstChild) {
      const firstChild = component.firstChild;

      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      switch (firstChild.nodeType) {
        case Node.ELEMENT_NODE:
          element.appendChild(firstChild.cloneNode(true));
          firstChild.remove();
          break;
        case Node.TEXT_NODE:
          element.appendChild(firstChild.cloneNode(true));
          firstChild.remove();
          break;
      }
    }
  }
};

/**
 *
 * @param {HTMLElement} component
 * @param {String} selector
 * @param {Boolean} useShadow
 */
export const customQuerySelector = (
  component: HTMLElement,
  selector: string,
  useShadow: boolean = USE_SHADOW_DOM
): HTMLElement => {
  if (useShadow) {
    const shadowRoot = component.shadowRoot;
    return shadowRoot ? shadowRoot.querySelector(`#${selector}`) : undefined;
  }

  return component.querySelector(`#${selector}`);
};

// ---------- Create DOM element from HTML string
/**
 * https://www.w3docs.com/snippets/javascript/how-to-create-a-new-dom-element-from-html-string.html
 * @param {String} html
 * @returns {HTMLElement}
 */
export const htmlFromString = (html: string): ChildNode => {
  const temp = document.createElement('template');
  html = html.trim();
  temp.innerHTML = html;

  return temp.content.firstChild;
};
