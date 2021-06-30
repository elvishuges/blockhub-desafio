import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import router from "./routes/router";
import store from "./store";

import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexcharts", VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
