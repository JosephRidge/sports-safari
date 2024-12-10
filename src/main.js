import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createWebHistory, createRouter } from "vue-router";

import Home from "./components/pages/Home.vue";
import StatsDashboard from "./components/pages/StatsDashboard.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/stats", component: StatsDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
