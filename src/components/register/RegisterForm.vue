<template>
  <v-card outlined>
    <v-card-title
      class="secondary"
      src="https://picsum.photos/1920/1080?random"
    >
      <v-icon large left>mdi-cube-unfolded</v-icon>
      <span>TIME WORK</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="registerFormValid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="form.name"
                dense
                :rules="nameRules"
                label="Nome"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="form.email"
                dense
                :rules="emailRules"
                label="Email"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" class="pl-1 pt-0 pr-1">
              <v-text-field
                v-model="form.password"
                ref="password"
                type="password"
                dense
                :rules="passwordRules"
                label="Password"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pl-0 pt-0 pr-0">
              <v-text-field
                v-model="form.confirmPassword"
                dense
                type="password"
                :rules="confirmPasswordRules"
                label="Comfirmar senha"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div style="cursor: pointer" @click="login()">
            Já possui cadastro ?
          </div>
          <v-spacer></v-spacer>
          <v-btn
            large
            :loading="loadingSubmitBottom"
            :rounded="false"
            dark
            color="secondary"
            @click="submitForm"
            >Cadastrar</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loadingSubmitBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      registerFormValid: true,
      nameRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length < 20) || "Nome deve ter menos de 20 caracteres",
      ],
      emailRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length <= 30) || "Email deve ter menos de 30 caracteres",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length < 20) || "Senha deve ter menos de 20 caracteres",
      ],
      confirmPasswordRules: [
        (value) => !!value || "Campo obrigatório",
        (value) =>
          value === this.form.password || "A senha confirmada não coincide.",
      ],
    };
  },

  methods: {
    login() {
      this.$router.push("/login");
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$emit("submitFormRegister", this.form);
      }
    },
  },
};
</script>

<style></style>
