import { $ } from "./shared/dom";
import { getLocalStorage, setLocalStorage } from "../js/shared/localStorage";

interface Imenu {
  name: string;
  soldOut: boolean;
}

class App {
  menu: {
    espresso: Imenu[];
    frappuccino: Imenu[];
    blended: Imenu[];
    teavana: Imenu[];
    desert: Imenu[];
  };
  currentCategory: string;

  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };
    this.currentCategory = "espresso";

    this.init();
  }

  init() {
    if (getLocalStorage("menu")) this.menu = getLocalStorage("menu");

    this.render();
    this.initEventListeners();
  }

  render() {
    const template = this.menu[this.currentCategory]
      .map((menuItem: Imenu, index: number) => {
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

    ($("#menu-list") as HTMLUListElement).innerHTML = template;
  }

  initEventListeners() {
    ($("#menu-list") as HTMLUListElement).addEventListener(
      "click",
      (e: MouseEvent) => {
        if (
          (e.target as HTMLButtonElement).classList.contains("menu-edit-button")
        ) {
          this.updateMenuName(e);
        } else if (
          (e.target as HTMLButtonElement).classList.contains(
            "menu-remove-button"
          )
        ) {
          this.removeMenuName(e);
        } else if (
          (e.target as HTMLButtonElement).classList.contains(
            "menu-sold-out-button"
          )
        ) {
          this.soldOutMenu(e);
        }
      }
    );

    ($("#menu-form") as HTMLFormElement).addEventListener("submit", (e) => {
      e.preventDefault();
    });

    ($("#menu-submit-button") as HTMLButtonElement).addEventListener(
      "click",
      this.addMenu.bind(this)
    );

    ($("#menu-name") as HTMLInputElement).addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;

      this.addMenu();
    });

    ($("nav") as HTMLElement).addEventListener("click", (e: MouseEvent) => {
      const isCategoryButton = (
        e.target as HTMLButtonElement | HTMLElement
      ).classList.contains("cafe-category-name");

      if (isCategoryButton) {
        const categoryName = (e.target as HTMLButtonElement).dataset
          .categoryName;
        this.currentCategory = categoryName;

        ($("#category-title") as HTMLHeadElement).innerText = `${
          (e.target as HTMLButtonElement).innerText
        } 메뉴 관리`;

        this.render();
      }
    });
  }

  addMenu() {
    if (($("#menu-name") as HTMLInputElement).value === "") {
      alert("메뉴 이름을 입력해주세요.");
      return;
    }
    const menuName = ($("#menu-name") as HTMLInputElement).value;
    this.menu[this.currentCategory].push({ name: menuName });
    setLocalStorage("menu", this.menu);
    this.render();
    ($("#menu-name") as HTMLInputElement).value = "";
  }

  updateMenuName(e: MouseEvent) {
    const menuId = (e.target as HTMLButtonElement).closest("li").dataset.menuId;
    const $menuName = (e.target as HTMLButtonElement)
      .closest("li")
      .querySelector(".menu-name") as HTMLSpanElement;
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);

    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    setLocalStorage("menu", this.menu);
    this.render();
  }

  removeMenuName(e: MouseEvent) {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = (e.target as HTMLButtonElement).closest("li").dataset
        .menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      setLocalStorage("menu", this.menu);
      this.render();
    }
  }

  soldOutMenu(e: MouseEvent) {
    const menuId = (e.target as HTMLButtonElement).closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    setLocalStorage("menu", this.menu);
    this.render();
  }
}

new App();
