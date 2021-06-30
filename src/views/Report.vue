<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="6">
        <v-data-table
          dense
          :headers="headersProjectHours"
          :items="projectHoursItemsTable"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                Projeto/Horas
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-icon large left>
              mdi-chart-bar-stacked
            </v-icon>
            <span class="text-h6 font-weight-light">Gráfico</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            <pie-chart />
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
      projectHoursItemsTable: [],
      allProject: [],
      allHours: [],
      headersProjectHours: [
        {
          text: "Projeto",
          align: "start",
          sortable: false,
          value: "project",
        },
        { text: "Data", value: "day" },
        { text: "Horas (g)", value: "hours" },
        { text: "Usuário (g)", value: "user" },
      ],
    };
  },
  mounted() {
    this.getHoursAndProjects();
  },
  methods: {
    async getHoursAndProjects() {
      const responseProjectHours = await Promise.all([
        HoursService.getAllHours(),
        ProjectService.getAllProjects(),
      ]);

      this.allHours = responseProjectHours[0].data;
      this.allProject = responseProjectHours[1].data;
      this.formatTableItems();
    },
    formatTableItems() {
      console.log("all ", this.allHours, this.allProject);

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
          console.log("tableElement", tableElement);
        }
      });
    },
  },
};
</script>

<style></style>
