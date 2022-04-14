import { $ } from '../../utils/dom';
import { go } from '../../router';
import { HEADER_TEMPLATE } from './template';
import PATHNAMES from '../../constants/pathnames';

export const renderHeader = ($parent: Element) => {
  $parent.innerHTML = HEADER_TEMPLATE;

  ($('nav') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
    const isCategoryButton = (
      e.target as HTMLButtonElement | HTMLElement
    ).classList.contains('cafe-category-name');

    if (isCategoryButton) {
      const categoryName = (e.target as HTMLButtonElement).dataset.categoryName;

      if (categoryName) go(categoryNameToPathname(categoryName));
    }
  });
};

function categoryNameToPathname(categoryName: string) {
  switch (categoryName) {
    case 'espresso':
      return PATHNAMES.ESPRESSO;
    case 'frappuccino':
      return PATHNAMES.FRAPPUCCINO;
    case 'blended':
      return PATHNAMES.BLENDED;
    case 'teavana':
      return PATHNAMES.TEAVANA;
    case 'desert':
      return PATHNAMES.DESERT;
    default:
      return PATHNAMES.ESPRESSO;
  }
}
