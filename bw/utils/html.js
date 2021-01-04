// ---------- Common HTML elements
export const APP_WRAPPER = document.querySelector("#bw-app-wrapper");
export const APP_NAV_BACKDROP = document.querySelector("#bw-nav-backdrop");
export const APP_NAV_DRAWER = document.querySelector("#bw-nav-drawer");
export const APP_HEADER = document.querySelector("#bw-app-header");
export const APP_CONTENT = document.querySelector("#bw-app-content");
export const APP_FOOTER = document.querySelector("#bw-app-footer");

// ---------- Custom elements
/**
 * Global flag to trigger custom elements rendering with shadow DOM
 */
export const USE_SHADOW_DOM = false;

/**
 * Either attach the built component to a shadow DOM or directly as a child
 * of a custom element
 *
 * @param {HTMLElement} component
 * @param {HTMLElement | Array<HTMLElement>} element
 * @param {Boolean} useShadow
 */
export const attachCustomElementNode = (
  component,
  element,
  useShadow = USE_SHADOW_DOM
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
  let shadowRoot = component.attachShadow({ mode: "open" });
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
  component,
  element,
  useShadow = USE_SHADOW_DOM
) => {
  if (useShadow) {
    element.appendChild(document.createElement("slot"));
  } else {
    element.innerHTML = component.innerHTML;
    // Component initial innerHTML must be deleted as if shadow DOM is
    // not used, the component innerHTML is used to render the content
    component.innerHTML = "";
  }
};

// ---------- Create DOM element from HTML string
/**
 * https://www.w3docs.com/snippets/javascript/how-to-create-a-new-dom-element-from-html-string.html
 * @param {String} html
 * @returns {HTMLElement}
 */
export const htmlFromString = (html) => {
  let temp = document.createElement("template");
  html = html.trim();
  temp.innerHTML = html;

  return temp.content.firstChild;
};
