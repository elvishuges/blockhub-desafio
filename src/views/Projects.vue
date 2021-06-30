<template>
  <v-app>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        loading-text="Loading... Please wait"
        :loading="loadingData"
        :items="projects"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Projeto/Horas
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >Cadastrar</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:item.active="{ item }">
          <v-chip :color="colorActive(item.active)" dark>
            {{ item.active }}
          </v-chip>
        </template></v-data-table
      >
    </v-card></v-app
  >
</template>

<script>
import ProjectService from "./../services/ProjectService";
export default {
  data() {
    return {
      search: "",
      loadingData: false,
      headers: [
        {
          text: "Ativo",
          align: "center",
          sortable: false,
          value: "active",
        },
        { text: "Nome", align: "center", value: "name" },
        { text: "Id", align: "center", value: "_id" },
      ],
      projects: [],
    };
  },
  mounted() {
    this.getAllProjects();
  },

  methods: {
    getAllProjects() {
      this.loadingData = true;
      ProjectService.getAllProjects()
        .then((rsp) => {
          console.log("getAllProjects", rsp);
          this.projects = rsp.data;
          this.loadingData = false;
        })
        .catch((error) => {
          console.log("Error Catch", error);
          this.loadingData = false;
        });
    },
    colorActive(item) {
      return item ? "blue" : "red";
    },
  },
};
</script>

<style></style>
