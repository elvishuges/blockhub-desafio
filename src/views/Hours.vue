<template>
  <v-app>
    <v-card>
      <v-card-title>
        Horas
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
        :items="hours"
        :search="search"
      ></v-data-table> </v-card
  ></v-app>
</template>

<script>
import HoursService from "./../services/HoursService";
export default {
  data() {
    return {
      search: "",
      loadingData: false,
      headers: [
        {
          text: "Dia",
          align: "center",
          sortable: false,
          value: "day",
        },
        { text: "Horas", align: "center", value: "hours" },
        { text: "Id", align: "center", value: "_id" },
      ],
      hours: [],
    };
  },

  mounted() {
    this.getAllHours();
  },
  methods: {
    getAllHours() {
      this.loadingData = true;
      HoursService.getAllHours()
        .then((rsp) => {
          console.log("getAllProjects", rsp);
          this.hours = rsp.data;
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
