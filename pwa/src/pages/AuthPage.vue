<template>
  <q-page class="flex flex-center bg-image">
    <custom-card
      :title="title"
      subtitle="Acessar consultorio virtual"
      style="width: 500px"
    >
      <article v-if="login">
        <login-form />
      </article>
      <article v-else>
        <signin-form />
      </article>

      <q-separator />
      <div class="row justify-between q-pt-md q-px-md">
        <q-btn
          flat
          class="text-overline text-weight-light"
          @click="toggleContext"
        >
          {{ contextSwitch }}
        </q-btn>
        <q-btn flat class="text-overline text-weight-light" disable>
          Esqueci a Senha
        </q-btn>
      </div>
    </custom-card>
  </q-page>
</template>

<script>
import Router from "src/router";
import { defineComponent } from "vue";
import CustomCard from "src/components/CustomCard.vue";
import LoginForm from "src/components/Auth/LoginForm.vue";
import SigninForm from "src/components/Auth/SigninForm.vue";

export default defineComponent({
  name: "AuthPage",
  components: {
    "custom-card": CustomCard,
    "login-form": LoginForm,
    "signin-form": SigninForm,
  },
  data() {
    return {
      login: true,
    };
  },
  computed: {
    title() {
      return this.login ? "Login" : "Cadastrar-se";
    },
    contextSwitch() {
      return this.login ? "Criar Novo Acesso" : "Já Possuo um Acesso";
    },
  },
  mounted() {
    this.redirectSignIn();
  },
  methods: {
    toggleContext() {
      this.login = !this.login;
    },
    redirectSignIn() {
      const newUser = Router.currentRoute.value.query.newUser;
      if (newUser) {
        this.login = false;
      }
    },
  },
});
</script>

<style scoped>
.bg-image {
  width: 100%;
  height: 100%;
  background-image: url("src/assets/hero-bg.webp");
  background-repeat: no-repeat;
  object-fit: contain;
}
</style>
