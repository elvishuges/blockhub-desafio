<template>
  <v-app>
    <v-card>
      <v-card-title>
        Usuários
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
        :items="users"
        :search="search"
      ></v-data-table> </v-card
  ></v-app>
</template>

<script>
import UserService from "./../services/UserService";
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
        { text: "Email", align: "center", value: "email" },
        { text: "Id", align: "center", value: "_id" },
      ],
      users: [],
    };
  },

  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      this.loadingData = true;
      UserService.getAllUsers()
        .then((rsp) => {
          console.log("getAllProjects", rsp);
          this.users = rsp.data;
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
