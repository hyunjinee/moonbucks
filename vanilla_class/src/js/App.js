import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import List from "./components/List.js";
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Component from "./core/Component.js";

class App extends Component {
  constructor(parentNode, childComponents = {}, state = {}) {
    super(parentNode, childComponents, state);

    if (store.getLocalStorage()) {
      this.state.menu = store.getLocalStorage();
    }

    this.render();
  }

  renderSelf() {
    $("#app").innerHTML = this.template();

    this.renderHeader();
    this.renderForm();
    this.renderList();
  }

  renderHeader() {
    const $header = new Header(
      $("header"),
      {
        updateMenu: this.renderList.bind(this),
      },
      this.state
    );
    $header.render();
  }

  renderForm() {
    const $form = new Form(
      $("#menu-form"),
      {
        updateMenu: this.renderList.bind(this),
      },
      this.state
    );

    $form.render();
  }

  renderList() {
    const $list = new List($("#menu-list"), {}, this.state);

    $list.render();
  }

  addEventListeners() {}

  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between">
            <h2 id="category-title" class="mt-1">
              ☕ 에스프레소 메뉴 관리
            </h2>
            <span class="mr-2 mt-4 menu-count">총 0개</span>
          </div>
          <form id="menu-form"></form>
          <ul id="menu-list" class="mt-3 pl-0"></ul>
        </div>
      </main>
    </div>
  </div>`;
  }
}

export default App;
