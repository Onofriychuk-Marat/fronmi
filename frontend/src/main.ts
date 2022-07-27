import { createApp } from "vue";
import App from "./App.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const App = require("./App.vue");
// import "./registerServiceWorker";
import router from "./router";
/* window.$app type */
import "./assets/scss/style.scss";

// const handlers = new Map();

// function updateHandler(el: any, binding: any) {
//   el.removeEventListener("input", handlers.get(el));

//   const handler = () => {
//     const value = el.value.replace(/\D/g, "").slice(0, binding.value);
//     if (value !== el.value) {
//       el.value = value;
//       el.dispatchEvent(new Event("input"));
//     }
//   };
//   handler();
//   handlers.set(el, handler);

//   el.addEventListener("input", handler);
// }

// App.directive("maxlen", {
//   bind: updateHandler,
//   update: updateHandler,
//   unbind(el: any) {
//     el.removeEventListener("input", handlers.get(el));
//     handlers.delete(el);
//   },
// });

createApp(App).use(router).mount("#app");

