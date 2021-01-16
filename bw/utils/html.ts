// ---------- Common HTML elements
export const APP_WRAPPER = document.querySelector('#bw-app-wrapper');
export const APP_NAV_BACKDROP = document.querySelector('#bw-nav-backdrop');
export const APP_NAV_DRAWER = document.querySelector('#bw-nav-drawer');
export const APP_HEADER = document.querySelector('#bw-app-header');
export const APP_CONTENT = document.querySelector('#bw-app-content');
export const APP_FOOTER = document.querySelector('#bw-app-footer');

// ---------- Custom elements
/**
 * Global flag to trigger custom elements rendering with shadow DOM
 */
export const USE_SHADOW_DOM = false;

/**
 * Either attach the built component to a shadow DOM or directly as a child
 * of a custom element
 */
export const attachCustomElementNode = (
  component: HTMLElement,
  element: HTMLElement | HTMLElement[],
  useShadow: boolean = USE_SHADOW_DOM
) => {
  // Modify custom element children
  if (!useShadow) {
    if (Array.isArray(element)) {
      element.forEach((e) => component.appendChild(e));
    } else {
      component.innerHTML = element.outerHTML;
    }
    return;
  }

  // Use shadow DOM
  let shadowRoot = component.attachShadow({ mode: 'open' });
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
) => {
  if (useShadow) {
    element.appendChild(document.createElement('slot'));
  } else {
    element.innerHTML = component.innerHTML;
    // Component initial innerHTML must be deleted as if shadow DOM is
    // not used, the component innerHTML is used to render the content
    component.innerHTML = '';
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
) => {
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
export const htmlFromString = (html: string) => {
  let temp = document.createElement('template');
  html = html.trim();
  temp.innerHTML = html;

  return temp.content.firstChild;
};

// ----------- Create standard elements
export const createFlexSpacer = () => {
  const flexSpacer = document.createElement('div');
  flexSpacer.classList.add('bw-flex-spacer');

  return flexSpacer;
};
