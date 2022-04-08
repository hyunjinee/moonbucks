import Component from "../core/Component.js";
import store from "../store/index.js";
import { $ } from "../utils/dom.js";

class Form extends Component {
  constructor(parentNode, props = {}, state = {}) {
    super(parentNode, props, state);
  }

  renderSelf() {
    this.parentNode.innerHTML = this.template();
  }

  addEventListeners() {
    this.parentNode.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addMenuName();
    });

    $("#menu-submit-button").addEventListener("click", this.addMenuName);
  }

  addMenuName() {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const menuName = $("#menu-name").value;
    this.state.menu[this.state.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.state.menu);
    this.props.updateMenu();
    $("#menu-name").value = "";
  }

  template() {
    return `
                <div class="d-flex w-100">
                  <label for="menu-name" class="input-label" hidden>
                    메뉴 이름
                  </label>
                  <input
                    type="text"
                    id="menu-name"
                    name="menuName"
                    class="input-field"
                    placeholder="메뉴 이름"
                    autocomplete="off"
                  />
                  <button
                    type="button"
                    name="submit"
                    id="menu-submit-button"
                    class="input-submit bg-green-600 ml-2"
                  >
                    확인
                  </button>
                </div>
    `;
  }
}

export default Form;
