import PATHNAMES from '../constants/pathnames';
import TITLES from '../constants/titles';
import { renderMain } from './main/view';
import { $ } from '../utils/dom';

// const renderContents = {
//   // [PATHNAMES.ESPRESSO]
// };
export const renderContents = (pathname: string) => {
  $('main')?.remove();
  renderMain($('#app')!);
};

export const renderTitle = (pathname: string) => {
  document.title = TITLES[pathname];
};

export const render = (pathname: string) => {
  renderTitle(pathname);
  renderContents(pathname);
};
