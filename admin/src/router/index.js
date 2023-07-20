import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import CurrenciesView from "@/views/CurrenciesView.vue";
import { store } from "@/services/auth.js";


const routes = [
  {
    path: "/admin",
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
  {
    path: "/admin/currencies",
    name: "Currencies",
    component: CurrenciesView,
    meta: {
      middleware: "auth",
    }
  },
  {
    path: "/admin/pairs",
    name: "Pairs",
    component: HomeView,
    meta: {
      middleware: "auth",
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

      if (store.user) {
        middleware === "guest" ? next('/admin') : next();
      }else{
        if (await store.getUser()) {
          middleware === "guest" ? next('/admin') : next();
        }else{
          middleware === "auth" ? next('/login') : next();
        }
      }
    }else{
      next();
    }
    
});


export default router;
