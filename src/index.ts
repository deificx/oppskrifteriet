import { createApp } from "vue";

import { createWebHashHistory, createRouter } from "vue-router";

import BaseApp from "./apps/base-app.vue";
import RecipeApp from "./apps/recipe-app.vue";
import CreateApp from "./apps/create-app.vue";

const routes = [
  { path: "/", component: RecipeApp },
  { path: "/create", component: CreateApp },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(BaseApp).use(router).mount("#app");
