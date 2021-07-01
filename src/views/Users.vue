<template>
  <v-app>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        loading-text="Loading... Please wait"
        :loading="loadingData"
        :items="users"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Usuários
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Novo usuário</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="pa-0">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nome do usuário"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email do usuário"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Senha do usuário"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.active="{ item }">
          <v-chip :color="colorActive(item.active)" dark>
            {{ item.active }}
          </v-chip>
        </template></v-data-table
      >
    </v-card>
    <alert-snack-bar :text="textAlertSnack" ref="ref-alert-snack-bar"
  /></v-app>
</template>

<script>
import UserService from "./../services/UserService";
import AlertSnackBar from "@/components/AlertSnackBar";

export default {
  components: {
    AlertSnackBar,
  },
  data() {
    return {
      search: "",
      textAlertSnack: "",

      loadingData: false,

      dialog: false,

      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
        password: "",
      },

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
          console.log("getAllUsers", rsp);
          this.users = rsp.data;
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
    save() {
      const { name, email, password } = this.editedItem;
      UserService.create({ name: name, email: email, password: password })
        .then((rsp) => {
          this.users.push(rsp.data);
          this.textAlertSnack = "Usuário cadastrado com sucesso !!";
          this.$refs["ref-alert-snack-bar"].show();
          this.close();
        })
        .catch((error) => {
          console.log("catch create", error);
          this.textAlertSnack = "Algo deu arrado !!";
          this.$refs["ref-alert-snack-bar"].show();
          this.close();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style></style>
