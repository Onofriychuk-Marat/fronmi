import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Channel from "../views/Channel.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Channel",
    component: Channel,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
