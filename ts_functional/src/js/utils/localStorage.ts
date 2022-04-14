export const setLocalStorage = (name: string, value: object): void =>
  localStorage.setItem(name, JSON.stringify(value));
export const getLocalStorage = (name: string): any =>
  JSON.parse(localStorage.getItem(name) ?? '');
