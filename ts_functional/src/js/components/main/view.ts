import { $ } from '../../utils/dom';
import { ICafe, IMenu } from '../../..';
import { MAIN_TEMPLATE } from './template';
import { getState, setState } from '../../utils/observer';

type Category = 'espresso' | 'frappuccino' | 'blended' | 'teavana' | 'desert';

export const renderMain = ($parent: Element) => {
  $parent.insertAdjacentHTML('beforeend', MAIN_TEMPLATE);
  initEventListeners();
};

function initEventListeners() {
  ($('#menu-form') as HTMLFormElement).addEventListener('submit', (e) => {
    e.preventDefault();
  });

  ($('#menu-name') as HTMLInputElement).addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;

    addMenu();
  });
}

function addMenu() {
  if (($('#menu-name') as HTMLInputElement).value === '') {
    alert('메뉴 이름을 입력해주세요.');
    return;
  }
  const menuName = ($('#menu-name') as HTMLInputElement).value;
  const currentCategory = getState('currentCategory') as Category;
  const menu = getState('menu') as ICafe;
  console.log(menu);
  menu[currentCategory].push({ name: menuName, soldOut: false });
  setState('menu')(menu);
}
