import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "页面找不到啦"
    }
  }
];

export default routes;
