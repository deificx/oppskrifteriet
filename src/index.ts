import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import BaseApp from '@/apps/base-app.vue';
import CreateApp from '@/apps/create-app.vue';
import LoginApp from '@/apps/login-app.vue';
import RecipeApp from '@/apps/recipe-app.vue';

const routes = [
  { path: '/', component: RecipeApp },
  { path: '/create', component: CreateApp },
  { path: '/login', component: LoginApp },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(BaseApp).use(router).mount('#app');
