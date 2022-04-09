export const setLocalStorage = (name: string, value: object) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name));
};
