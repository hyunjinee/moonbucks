import { $ } from "../utils/dom.js";
import Component from "../core/Component.js";
import store from "../store/index.js";

class List extends Component {
  constructor(parentNode, props = {}, state = {}) {
    super(parentNode, props, state);
  }

  renderSelf() {
    this.parentNode.innerHTML = this.template();
    this.updateMenuCount();
  }

  updateMenuCount() {
    const menuCount = this.state.menu[this.state.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  }

  updateMenuName(e) {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector("span");
    console.log(menuId, $menuName);
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.state.menu[this.state.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.state.menu);
    this.render();
  }

  removeMenuName(e) {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.state.menu[this.state.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.state.menu);
      this.render();
    }
  }

  addEventListeners() {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        this.updateMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        this.removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });
  }

  template() {
    return this.state.menu[this.state.currentCategory]
      .map((menuItem, index) => {
        return `
    <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${
        menuItem.soldOut ? "sold-out" : ""
      } ">${menuItem.name}</span>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
          품절
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
      })
      .join("");
  }
}

export default List;
