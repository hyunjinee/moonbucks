import { render } from '../components';

export function handleWindowPopState() {
  console.log('popstate');
}

export function go(pathname: string) {
  addPathnameToBrowserHistory(pathname);
  render(pathname);
}

function addPathnameToBrowserHistory(pathname: string) {
  if (!isChangedPathname(pathname)) return;

  window.history.pushState({ route: pathname }, '', pathname);
}

function isChangedPathname(pathname: string) {
  return window.location.pathname !== pathname;
}
