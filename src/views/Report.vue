<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="7">
        <v-card>
          <v-data-table
            dense
            :loading="loadingData"
            :headers="headersProjectHours"
            :items="projectHoursItemsTable"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:body.prepend>
              <tr>
                <td>
                  <v-text-field
                    type="text"
                    v-model="searchProject"
                    label="Filtrar por projeto..."
                  ></v-text-field>
                  <v-text-field
                    class="d-flex d-sm-none"
                    type="text"
                    v-model="searchDay"
                    label="Filtrar por data..."
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    class="d-none d-sm-flex"
                    type="text"
                    v-model="searchDay"
                    label="Filtrar por data..."
                  ></v-text-field>
                </td>
              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>
                  Horas/Projeto
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-icon large left>
              mdi-chart-bar-stacked
            </v-icon>
            <span class="text-h6 font-weight-light">Gráfico</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold d-flex justify-center">
            <pie-chart
              :series="seriesChartPie"
              :loading="loadingChartPie"
              ref="piechart"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-icon large left>
              mdi-chart-bar-stacked
            </v-icon>
            <span class="text-h6 font-weight-light "
              >Gráfico - Horas ao longo dos meses</span
            >
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            <bar-chart
              :series="seriesBarChart"
              :loading="loadingChartPie"
              ref="barchart"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <alert-snack-bar :text="textAlertSnack" ref="ref-alert-snack-bar" />
  </v-app>
</template>

<script>
import ProjectService from "./../services/ProjectService";
import HoursService from "./../services/HoursService";
import UserService from "./../services/UserService";

import PieChart from "@/components/Report/PieChart";
import BarChart from "@/components/Report/BarChart";

import AlertSnackBar from "@/components/AlertSnackBar";

export default {
  components: {
    PieChart,
    BarChart,
    AlertSnackBar,
  },
  data() {
    return {
      textAlertSnack: "",

      searchProject: "",
      searchDay: "",
      loadingData: false,
      projectHoursItemsTable: [],

      allProject: [],
      allHours: [],
      allUsers: [],

      seriesChartPie: [],

      seriesBarChart: [
        {
          name: "Horas:",
          data: [],
        },
      ],

      loadingChartPie: false,

      headersProjectHours: [
        {
          text: "Projeto",
          align: "start",
          sortable: false,
          value: "project",
          filter: (f) => {
            return (f + "")
              .toLowerCase()
              .includes(this["searchProject"].toLowerCase());
          },
        },
        {
          text: "Data",
          value: "day",
          filter: (f) => {
            return (f + "")
              .toLowerCase()
              .includes(this["searchDay"].toLowerCase());
          },
        },
        { text: "Horas ", value: "hours" },
        { text: "Usuário", value: "user" },
      ],
    };
  },
  mounted() {
    this.getHoursAndProjects();
  },
  methods: {
    async getHoursAndProjects() {
      this.loadingChartPie = true;
      this.loadingData = true;
      try {
        const responseProjectHours = await Promise.all([
          HoursService.getAllHours(),
          ProjectService.getAllProjects(),
          UserService.getAllUsers(),
        ]);

        this.allHours = responseProjectHours[0].data;
        this.allProject = responseProjectHours[1].data;
        this.allUsers = responseProjectHours[2].data;

        this.formatTableItems();
        this.formataChartPieData();
        this.foramtBarChartData(0);
      } catch (error) {
        this.loadingChartPie = false;
        this.loadingData = false;
        this.textAlertSnack = error.toString();
        this.$refs["ref-alert-snack-bar"].show();
      }
      console.log(
        "horas ",
        this.allHours,
        "Projetos",
        this.allProject,
        "usuarios",
        this.allUsers
      );

      this.loadingChartPie = false;
      this.loadingData = false;
    },

    formatTableItems() {
      this.allHours.forEach((hour) => {
        let project = this.allProject.find(
          (project) => project._id === hour.project
        );
        let user = this.allUsers.find((user) => user._id === hour.user);
        if (project) {
          let tableElement = {
            project: project.name,
            hours: hour.hours,
            day: hour.day,
            user: user ? user.name : "--",
            active: project.active,
          };
          this.projectHoursItemsTable.push(tableElement);
        }
      });
    },

    formataChartPieData() {
      let chartLabels = [];
      let chartSeries = [];

      this.allProject.forEach((project) => {
        const projectHours = this.allHours.filter(
          (hour) => hour.project === project._id
        );
        if (projectHours.length) {
          const valueHours = projectHours.reduce(
            (prev, curr) => curr.hours + prev,
            0
          );
          chartSeries.push(valueHours);
          chartLabels.push(project.name);
        }
      });
      this.seriesChartPie = chartSeries;
      this.$refs.piechart.updateLabels(chartLabels);
    },

    foramtBarChartData() {
      const groups = this.groupByHoursInMonth(this.allHours);

      const groupKeys = Object.keys(groups);
      const groupsValues = Object.values(groups);
      console.log("keys", groupKeys, "valus", groupsValues);
      this.seriesBarChart[0] = {
        name: "Horas",
        data: groupsValues,
        color: "#28c76f",
      };
      this.$refs.barchart.updateCategories(groupKeys);
    },

    groupByHoursInMonth(data) {
      let hoursInMonth = {};

      data.forEach(function(val) {
        var date = val.day.split("-")[1];
        if (hoursInMonth[date] === undefined) {
          hoursInMonth[date] = val.hours;
        } else {
          hoursInMonth[date] += val.hours;
        }
      });

      return hoursInMonth;
    },
  },
};
</script>

<style></style>
