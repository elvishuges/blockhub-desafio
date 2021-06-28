const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const Dashboard = () => import("@/views/Dashboard.vue");

const Projects = () => import("@/views/Projects.vue");

let LoginRoute = {
  path: "/login",
  component: Login,
  name: "Login",
};

let RegisterRoute = {
  path: "/register",
  component: Register,
  name: "Register",
};

let DashboardRoute = {
  path: "/dashboard",
  component: Dashboard,
  name: "Dashboard",
  children: [
    {
      path: "projects",
      name: "Projects",
      component: Projects,
    },
  ],
};

const routes = [LoginRoute, RegisterRoute, DashboardRoute];

export default routes;
