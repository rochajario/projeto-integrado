<template>
  <div class="q-pa-md" style="width: 100%">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        type="text"
        v-model="firstName"
        label="Primeiro Nome"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Por favor informe seu primeiro nome',
        ]"
      />

      <q-input
        filled
        type="text"
        v-model="lastName"
        label="Último Nome"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Por favor informe seu sobrenome',
        ]"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="E-mail"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Por favor informe seu e-mail',
          (val) =>
            /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(val) ||
            'Por favor informe um e-mail valido',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Senha"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Por favor informe a senha',
        ]"
      />

      <div class="row justify-center q-mb-lg">
        <q-checkbox v-model="termsAndConditions" class="text-weight-light" />
        <q-btn
          flat
          dense
          label="Li e aceito os termos e condições"
          no-caps
          class="q-ml-sm text-weight-thin"
          @click="showDialog"
        />
      </div>

      <div class="row justify-center">
        <q-btn label="Entrar" color="primary" @click="onSubmit" />
      </div>
    </q-form>
  </div>
</template>

<script>
import Router from "src/router";
import { termsAndConditionsDoc } from "src/components/Help/TermsAndConditionsDoc";
import { Notify, Dialog } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      termsAndConditions: false,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  },
  computed: {
    store() {
      return useUserStore();
    },
    termsAndConditionsDoc() {
      return termsAndConditionsDoc;
    },
  },
  mounted() {
    this.useQueryParams();
  },
  methods: {
    onSubmit() {
      if (this.termsAndConditions) {
        this.store.signIn({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        return;
      }
      Notify.create({
        color: "negative",
        message: "Necessário aceitar termos e condições.",
      });
    },
    useQueryParams() {
      const firstName = Router.currentRoute.value.query.firstName;
      const lastName = Router.currentRoute.value.query.lastName;
      const email = Router.currentRoute.value.query.email;

      if (firstName && lastName && email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
      }
    },
    showDialog() {
      Dialog.create({
        ...this.termsAndConditionsDoc,
        class: "title text-primary",
        html: true,
        style: {
          width: "500px",
        },
      });
    },
  },
});
</script>
