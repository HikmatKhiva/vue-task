import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import maskDateDirective from "./directives/mask-date";
const app = createApp(App);
app.directive("mask-date", maskDateDirective);
app.mount("#app");
