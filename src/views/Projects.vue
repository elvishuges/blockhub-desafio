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
        :items="projects"
        :search="search"
      >
        <template v-slot:top>
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
                  <span class="text-h5">Novo item</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nome do projeto"
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
    <alert-snack-bar :text="textAlertSnack" ref="ref-alert-snack-bar" />
  </v-app>
</template>

<script>
import ProjectService from "./../services/ProjectService";
import AlertSnackBar from "@/components/AlertSnackBar";
export default {
  components: {
    AlertSnackBar,
  },
  data() {
    return {
      search: "",
      loadingData: false,

      textAlertSnack: "",

      dialog: false,

      editedIndex: -1,
      editedItem: {
        name: "",
      },

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
    save() {
      console.log("save", this.editedItem);
      const { name } = this.editedItem;
      ProjectService.create({ name })
        .then((rsp) => {
          console.log("rsp save", rsp);
          this.projects.push(rsp.data);
          this.textAlertSnack = "Projeto cadastrado com sucesso !!";
          this.$refs["ref-alert-snack-bar"].show();
          this.close();
        })
        .catch((error) => {
          console.log("catch save", error);
          this.textAlertSnack = "Algo deu arrado !!";
          this.$refs["ref-alert-snack-bar"].show();
          this.close();
        });
    },
    colorActive(item) {
      return item ? "blue" : "red";
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
