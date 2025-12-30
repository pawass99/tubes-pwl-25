import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import MoviesList from "../views/MoviesList.vue";
import MovieDetail from "../views/MovieDetail.vue";
import MovieForm from "../views/MovieForm.vue";
import RegisterView from "../views/RegisterView.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: DashboardView, meta: { requiresAuth: true } },
    { path: "/login", name: "login", component: LoginView, meta: { fullScreen: true, hideNav: true } },
    { path: "/register", name: "register", component: RegisterView, meta: { fullScreen: true, hideNav: true } },
    { path: "/movies", name: "movies", component: MoviesList },
    { path: "/movies/:id", name: "movieDetail", component: MovieDetail, props: true },
    {
      path: "/admin/movies/new",
      name: "movieCreate",
      component: MovieForm,
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: "/admin/movies/:id/edit",
      name: "movieEdit",
      component: MovieForm,
      props: true,
      meta: { requiresAuth: true, adminOnly: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (auth.token && !auth.user) {
    auth.restoreFromToken();
  }

  if (to.meta.requiresAuth && !auth.isLogged) {
    return next({ name: "login" });
  }
  if (to.name === "home" && auth.isLogged && !auth.isAdmin) {
    return next({ name: "movies" });
  }
  if (to.meta.adminOnly && !auth.isAdmin) {
    return next({ name: "home" });
  }
  if (to.name === "login" && auth.isLogged) {
    return next({ name: "home" });
  }
  next();
});

export default router;
