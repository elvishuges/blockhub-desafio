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
        ></v-text-field
        ><v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        loading-text="Loading... Please wait"
        :loading="loadingData"
        :items="hours"
        :search="search"
        ><template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Horas
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
                  <span class="text-h5">Cadastrar Hora/projeto</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="pa-0">
                        <v-text-field
                          v-model="editedItem.hours"
                          label="Horas"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="pa-0">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.day"
                              label="Data"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.day"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-select
                          :items="usersList"
                          item-text="name"
                          item-value="_id"
                          v-model="editedItem.user"
                          label="usuário"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-select
                          item-text="name"
                          item-value="_id"
                          :items="projectsList"
                          v-model="editedItem.project"
                          label="Projeto"
                        ></v-select>
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
        </template></v-data-table
      >
    </v-card>
    <alert-snack-bar :text="textAlertSnack" ref="ref-alert-snack-bar" />
  </v-app>
</template>

<script>
import HoursService from "./../services/HoursService";
import ProjectService from "./../services/ProjectService";
import UserService from "./../services/UserService";
import AlertSnackBar from "@/components/AlertSnackBar";

export default {
  components: {
    AlertSnackBar,
  },
  data() {
    return {
      search: "",
      loadingData: false,
      menu2: false,

      textAlertSnack: "",

      usersList: [],
      projectsList: [],

      dialog: false,

      editedIndex: -1,
      editedItem: {
        hours: "",
        day: new Date().toISOString().substr(0, 10),
        project: "",
        user: "",
      },

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
    this.getAllUsers();
    this.getAllProjects();
  },
  methods: {
    getAllHours() {
      this.loadingData = true;
      HoursService.getAllHours()
        .then((rsp) => {
          console.log("getAllHours", rsp);
          this.hours = rsp.data;
          this.loadingData = false;
        })
        .catch((error) => {
          console.log("Error Catch", error);
          this.loadingData = false;
        });
    },
    getAllUsers() {
      UserService.getAllUsers()
        .then((rsp) => {
          console.log("getAllUsers", rsp);
          this.usersList = rsp.data;
        })
        .catch((error) => {
          console.log("Error Catch", error);
        });
    },

    getAllProjects() {
      ProjectService.getAllProjects()
        .then((rsp) => {
          console.log("getAllProjects", rsp);
          this.projectsList = rsp.data;
        })
        .catch((error) => {
          console.log("Error Catch", error);
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      const { hours, day, project, user } = this.editedItem;
      HoursService.create({
        hours: parseInt(hours),
        day: day,
        project: project,
        user: user,
      })
        .then((rsp) => {
          this.hours.push(rsp.data);
          this.textAlertSnack = "Horário de projeto cadastrado com sucesso !!";
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
  },
};
</script>

<style></style>
