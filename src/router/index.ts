import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import routes from "@/router/routes";

const history = createWebHashHistory();

export default createRouter({
  history,
  routes
});
