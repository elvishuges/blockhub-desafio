<template>
  <div>
    <v-container>
      <login-register-bar
        color="primary"
        title="BlockHub builders"
      ></login-register-bar>
      <v-container fluid class="mt-4">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <register-form
              :loadingSubmitBottom="loading"
              @submitFormRegister="submit"
            ></register-form>
            <v-alert :value="alert" color="red">{{ msg }}</v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <alert-snack-bar
      :text="textAlertSnack"
      ref="ref-alert-snack-bar"
      :snackBarState="snackBarState"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import LoginRegisterBar from "@/components/LoginRegisterBar";
import RegisterForm from "../components/register/RegisterForm.vue";
import AlertSnackBar from "@/components/AlertSnackBar";

export default {
  components: {
    LoginRegisterBar,
    RegisterForm,
    AlertSnackBar,
  },
  data() {
    return {
      msg: "",
      textAlertSnack: "",
      snackBarState: false,
      alert: false,
      loading: false,

      nomeRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length < 20) || "Nome deve ter menos de 20 caracteres",
      ],
      emailRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length <= 30) || "Email deve ter menos de 30 caracteres",
      ],
      nickRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length <= 15) || "Nick deve ter menos de 15",
      ],
      senhaRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length < 20) || "Senha deve ter menos de 20 caracteres",
      ],
      confirmeSenhaRules: [
        (value) => !!value || "Campo obrigatório",
        (value) => value === this.senha || "A senha confirmada não coincide.",
      ],
    };
  },

  mounted() {},

  methods: {
    ...mapActions(["AUTH_REGISTER_REQUEST"]),

    handleLoginClick() {
      this.$router.push("/login");
    },

    submit(payload) {
      console.log("payload", payload);
      const { name, email, password } = payload;
      this.AUTH_REGISTER_REQUEST({ name, email, password })
        .then((rsp) => {
          console.log("login", rsp);
          this.loading = false;
          this.textAlertSnack = "Usuario cadastrado com sucesso !!";
          this.$refs["ref-alert-snack-bar"].show();
        })
        .catch((e) => {
          console.log("error login", e);
          this.textAlertSnack = "Algo deu errado !!";
          this.$refs["ref-alert-snack-bar"].show();
          this.loading = false;
          this.disableLoginButton = false;
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
