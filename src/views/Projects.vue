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
        :items="desserts"
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
      desserts: [
        {
          active: true,
          _id: "60d101de63a43200154283d2",
          name: "Desafio",
          __v: 0,
        },
        {
          active: false,
          _id: "60d34aaa78c6cf0015b2eab1",
          name: "Projeto de Teste",
          __v: 0,
        },
        {
          active: true,
          _id: "60d4ae666c250a00156a5d25",
          name: "Teste de Projeto",
          __v: 0,
        },
      ],
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
