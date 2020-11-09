import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MemoList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/MemoList.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
