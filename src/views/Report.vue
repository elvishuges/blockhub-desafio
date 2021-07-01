<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="7">
        <v-card>
          <v-data-table
            dense
            :search="searchTable"
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
                    label="Filtrar por projeto..."
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
    </v-row>
  </v-app>
</template>

<script>
import ProjectService from "./../services/ProjectService";
import HoursService from "./../services/HoursService";

import PieChart from "@/components/Report/PieChart";

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      searchProject: "",
      searchDay: "",
      loadingData: false,
      projectHoursItemsTable: [],
      allProject: [],
      allHours: [],

      seriesChartPie: [],

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
        ]);

        this.allHours = responseProjectHours[0].data;
        this.allProject = responseProjectHours[1].data;
      } catch (error) {
        this.loadingChartPie = false;
        this.loadingData = false;
      }
      console.log("horas e projetos", this.allHours, this.allProject);
      this.formatTableItems();
      this.formataChartPieData();
      this.loadingChartPie = false;
      this.loadingData = false;

      const responseProjectHours = await Promise.all([
        HoursService.getAllHours(),
        ProjectService.getAllProjects(),
      ]);

      this.allHours = responseProjectHours[0].data;
      this.allProject = responseProjectHours[1].data;
      console.log("horas e projetos", this.allHours, this.allProject);
      this.formatTableItems();
      this.formataChartPieData();
      this.loadingChartPie = false;
      this.loadingData = false;
    },

    formatTableItems() {
      this.allHours.forEach((hour) => {
        let project = this.allProject.find(
          (project) => project._id === hour.project
        );
        if (project) {
          let tableElement = {
            project: project.name,
            hours: hour.hours,
            day: hour.day,
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
        if (project.active) {
          chartLabels.push(project.name);
        }
      });

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
        }
      });
      this.seriesChartPie = chartSeries;
      this.$refs.piechart.updateLabels(chartLabels);
    },
  },
};
</script>

<style></style>
