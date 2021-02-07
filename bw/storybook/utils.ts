export const sbApplyBooleanAttr = (
  element: HTMLElement,
  attributes: { [key: string]: boolean | undefined }
) => {
  Object.entries(attributes).forEach(([attrName, attrValue]) => {
    if (attrValue) element.setAttribute(attrName, '');
  });
};

export const sbApplyAttrAsString = (
  element: HTMLElement,
  attributes: { [key: string]: string | number | boolean }
) => {
  Object.entries(attributes).forEach(([attrName, attrValue]) => {
    if (attrValue) element.setAttribute(attrName, attrValue.toString());
  });
};
