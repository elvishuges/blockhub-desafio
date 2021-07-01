const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const Dashboard = () => import("@/views/Dashboard.vue");

const Report = () => import("@/views/Report.vue");

const Projects = () => import("@/views/Projects.vue");
const Users = () => import("@/views/Users.vue");
const Hours = () => import("@/views/Hours.vue");

import { getToken } from "@/store/utils/token";

const ifNotAuthenticated = (to, from, next) => {
  if (!getToken()) {
    next("/login");
    return;
  }
  next();
};
const ifAuthenticated = (to, from, next) => {
  if (getToken()) {
    next("/dashboard/index");
    return;
  }
  next();
};

let LoginRoute = {
  path: "/login",
  component: Login,
  name: "Login",
  beforeEnter: ifAuthenticated,
};

let RegisterRoute = {
  path: "/register",
  component: Register,
  name: "Register",
};

let DashboardRoute = {
  path: "/dashboard",
  component: Dashboard,
  name: "dashboard",
  beforeEnter: ifNotAuthenticated,
  children: [
    {
      path: "index",
      name: "index",
      component: Report,
    },
    {
      path: "projects",
      name: "projects",
      component: Projects,
    },
    {
      path: "users",
      name: "users",
      component: Users,
    },
    {
      path: "hours",
      name: "hours",
      component: Hours,
    },
  ],
};

const routes = [
  LoginRoute,
  RegisterRoute,
  DashboardRoute,
  { path: "*", redirect: "/login" },
];

export default routes;
