import App from "./App.js";
import { $ } from "./utils/dom.js";

new App(
  $("#app"), // parentNode
  {}, // props
  {
    menu: {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    },
    currentCategory: "espresso",
  } // state
);
