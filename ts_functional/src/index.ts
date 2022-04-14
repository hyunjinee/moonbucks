import { renderHeader } from './js/components/header/view';
import { template } from './js/template/main';
import { $ } from './js/utils/dom';
import { go, handleWindowPopState } from './js/router';
import { render } from './js/components';
import { initState, setState } from './js/utils/observer';
import { getLocalStorage } from './js/utils/localStorage';

export interface IMenu {
  name: string;
  soldOut: boolean;
}

export interface ICafe {
  currentCategory: any;
  espresso: IMenu[];
  frappuccino: IMenu[];
  blended: IMenu[];
  teavana: IMenu[];
  desert: IMenu[];
}

function init() {
  window.addEventListener('popstate', handleWindowPopState);

  renderHeader($('#app')!);

  initState({
    key: 'menu',
    defaultValue: {
      espresso: [] as IMenu[],
      frappuccino: [] as IMenu[],
      blended: [] as IMenu[],
      teavana: [] as IMenu[],
      desert: [] as IMenu[],
    },
  });
  initState({
    key: 'currentCategory',
    defaultValue: 'espresso',
  });

  if (getLocalStorage('menu')) setState('menu')(getLocalStorage('menu'));

  go(location.pathname);
}

init();
// go(location.pathname);

// const $app = $('#app');

// window.addEventListener('load', () => {
//   history.replaceState({ route: location.pathname }, null, location.pathname);
//   render(location.pathname);
// });
