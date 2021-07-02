<template>
  <v-container class="column items-center">
    <login-register-bar title="BlockHub builders"></login-register-bar>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md8 class="pr-3 pt-4 pl-3 hidden-sm-and-down">
        <v-img
          src="https://www.fenderbender.com/ext/resources/publication/2020/0720/Marketing.png?1593534325"
        ></v-img>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <login-form
          :loadingSubmitBottom="loading"
          @submitFormLogin="submitForm"
        >
        </login-form>
        <v-alert dark shaped :value="alert" color="red">{{ msg }}</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script setup>
import { mapActions } from "vuex";

import LoginForm from "@/components/login/LoginForm";
import LoginRegisterBar from "@/components/LoginRegisterBar";

export default {
  components: {
    LoginRegisterBar,
    LoginForm,
  },
  data() {
    return {
      validFormLogin: true,
      loading: false,
      msg: "",
      alert: false,
    };
  },
  methods: {
    ...mapActions(["AUTH_LOGIN_REQUEST"]),
    submitForm(payload) {
      this.loading = true;
      this.alert = false;
      this.msg = "";
      const { email, password } = payload;

      this.AUTH_LOGIN_REQUEST({ email, password })
        .then((rsp) => {
          console.log("login", rsp);
          this.showAlert = false;
          this.loading = false;
          this.$router.push("/dashboard/index");
        })
        .catch((e) => {
          console.log("error login", e);
          this.alert = true;
          this.msg = "email ou senha incorretos";
          this.loading = false;
          this.disableLoginButton = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
