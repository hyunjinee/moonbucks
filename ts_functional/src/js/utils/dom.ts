export const $ = (selector: string): Element | null =>
  document.querySelector(selector);
export const $$ = (selector: string): NodeListOf<Element> =>
  document.querySelectorAll(selector);
