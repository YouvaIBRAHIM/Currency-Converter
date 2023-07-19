import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { store } from "@/services/auth.js";


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      middleware: "auth",
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      middleware: "guest"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.middleware) {
      const middleware = to.meta.middleware;
      const isAuth = await store.getUser();

      if (isAuth) {
        middleware === "guest" ? next('/') :next();
      }else{
        middleware === "auth" ? next('/login') :next();
      }
    }else{
      next();
    }
    
});


export default router;
