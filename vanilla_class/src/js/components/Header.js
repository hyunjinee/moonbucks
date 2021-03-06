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
        $("#category-title").innerText = `${e.target.innerText} λ©λ΄ κ΄λ¦¬`;

        this.state.currentCategory = categoryName;
        this.props.updateMenu();
      }
    });
  }

  template() {
    return `
            <a href="/" class="text-black">
              <h1 class="text-center font-bold">π λ¬Έλ²μ€ λ©λ΄ κ΄λ¦¬</h1>
            </a>
            <nav class="d-flex justify-center flex-wrap">
              <button
                data-category-name="espresso"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                β μμ€νλ μ
              </button>
              <button
                data-category-name="frappuccino"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                π₯€ νλΌνΈμΉλΈ
              </button>
              <button
                data-category-name="blended"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                πΉ λΈλ λλ
              </button>
              <button
                data-category-name="teavana"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                π« ν°λ°λ
              </button>
              <button
                data-category-name="desert"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                π° λμ νΈ
              </button>
            </nav>
    `;
  }
}

export default Header;
