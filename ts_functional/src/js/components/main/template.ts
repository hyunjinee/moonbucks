export const MAIN_TEMPLATE = `
<main class="mt-10 d-flex justify-center">
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 id="category-title" class="mt-1">
          ☕ 에스프레소 메뉴 관리
        </h2>
        <span class="mr-2 mt-4 menu-count">총 0개</span>
      </div>
      <form id="menu-form">
        <div class="d-flex w-100">
          <label for="menu-name" class="input-label" hidden>
            에스프레소 메뉴 이름
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
            data-category-name="espresso"
            type="button"
            name="submit"
            id="menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul
        data-category-name="espresso"
        id="menu-list"
        class="mt-3 pl-0"
      ></ul>
    </div>
  </main>
`;
