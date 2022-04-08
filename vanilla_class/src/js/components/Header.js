import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";

class Header extends Component {
  constructor(parentNode, props = {}, state = {}) {
    super(parentNode, props, state);
  }

  renderSelf() {
    this.parentNode.innerHTML = this.template();
  }

  addEventListeners() {
    $("nav").addEventListener("click", (e) => {
      const isCategoryButton =
        e.target.classList.contains("cafe-category-name");
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;

        this.state.currentCategory = categoryName;
        this.props.updateMenu();
      }
    });
  }

  template() {
    return `
            <a href="/" class="text-black">
              <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
            </a>
            <nav class="d-flex justify-center flex-wrap">
              <button
                data-category-name="espresso"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                ☕ 에스프레소
              </button>
              <button
                data-category-name="frappuccino"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🥤 프라푸치노
              </button>
              <button
                data-category-name="blended"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🍹 블렌디드
              </button>
              <button
                data-category-name="teavana"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🫖 티바나
              </button>
              <button
                data-category-name="desert"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🍰 디저트
              </button>
            </nav>
    `;
  }
}

export default Header;
