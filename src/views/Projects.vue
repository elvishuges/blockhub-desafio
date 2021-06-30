<template>
  <v-app>
    <v-card>
      <v-card-title>
        Projetos
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
      ></v-data-table> </v-card
  ></v-app>
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
          text: "Ativo ",
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
  },
};
</script>

<style></style>
