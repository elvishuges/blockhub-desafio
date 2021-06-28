<template>
  <div>
    <v-container>
      <login-register-bar color="primary" title="Freendly"></login-register-bar>
      <v-container fluid class="mt-4">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <register-form @submitFormRegister="submit"></register-form>
            <v-alert :value="alert" color="red">{{ msg }}</v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import LoginRegisterBar from "@/components/LoginRegisterBar";
import RegisterForm from "../components/register/RegisterForm.vue";
export default {
  components: {
    LoginRegisterBar,
    RegisterForm,
  },
  data() {
    return {
      msg: "",
      alert: false,

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

  methods: {
    handleLoginClick() {
      this.$router.push("/login");
    },
    submit() {
      // const { nome, nick, email, senha } = payload;
      // this.alert = false;
      // this.msg = "";
    },
  },
};
</script>

<style lang="less" scoped></style>
