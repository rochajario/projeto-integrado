import { Notify, Loading } from "quasar";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import Router from "src/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    accessToken: null,
    firstName: null,
    lastName: null,
    email: null,
  }),
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserData: (state) => {
      return {
        accessToken: state.accessToken,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
      };
    },
  },
  actions: {
    login(payload) {
      Loading.show();
      api
        .post("auth/login", payload)
        .then((res) => {
          this.accessToken = res.data.access_token;
          this.setUserData();
        })
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Login realizado com sucesso.",
          });
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Falha ao validar credenciais.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    signIn(payload) {
      api
        .post("user", payload)
        .then(() => {
          this.login(payload);
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Falha ao cadastrar novo usuário.",
          });
        });
    },
    setUserData() {
      api
        .get("user/profile")
        .then((res) => {
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.email = res.data.email;
        })
        .then(() => {
          Router.push({ name: "Home" });
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Falha ao obter dados pessoais.",
          });
        });
    },
    clearCredentials() {
      this.accessToken = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;

      Router.push({ name: "Login" });
    },
  },
});
