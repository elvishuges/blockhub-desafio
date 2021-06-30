<template>
  <v-app
    ><dashboard-drawer
      :drawerItens="drawerItens"
      @updateDrawer="updateDrawer"
      :drawer="drawer"
    />
    <dashboard-bar @open-drawer="handleOpenDrawerEvent" />
    <div class="pa-6"><router-view></router-view></div>
  </v-app>
</template>

<script>
import DashboardBar from "../components/Dashboard/DashboardBar.vue";
import DashboardDrawer from "../components/Dashboard/DashboardDrawer.vue";
export default {
  components: { DashboardBar, DashboardDrawer },
  data() {
    return {
      drawer: false,
      drawerItens: [
        {
          title: "Dashboard",
          icon: "mdi-chart-bar-stacked",
          route: "/dashboard/index",
        },
        {
          title: "Projeto",
          icon: "mdi-sitemap",
          route: "/dashboard/projects",
        },
        {
          title: "Usuários",
          icon: "mdi-account-group",
          route: "/dashboard/users",
        },
        {
          title: "Horas",
          icon: "mdi-clock",
          route: "/dashboard/hours",
        },
        {
          title: "Editar dados",
          icon: "mdi-content-save-edit",
          route: "/#",
        },
      ],
    };
  },
  methods: {
    handleClickOutside() {
      console.log("log", this.drawer);
      this.drawer ? (this.drawer = false) : "";
    },
    handleOpenDrawerEvent() {
      this.drawer = true;
    },
    updateDrawer(payload) {
      payload ? "" : (this.drawer = false);
    },
  },
};
</script>

<style lang="scss"></style>
