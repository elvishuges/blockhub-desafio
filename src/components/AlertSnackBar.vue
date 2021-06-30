<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackBarState">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackBarState = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Usuário cadsatrado com sucesso !",
    },
  },
  data() {
    return {
      snackBarState: false,
    };
  },
  methods: {
    show() {
      this.snackBarState = true;
    },
  },
};
</script>

<style></style>
