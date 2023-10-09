<template>
  <div class="q-pa-md" style="width: 100%">
    <q-form @submit="onSubmit" class="q-gutter-md">
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

      <div class="row justify-center">
        <q-btn label="Entrar" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useUserStore } from "src/stores/user-store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const store = useUserStore();

    return {
      email,
      password,
      store,

      onSubmit() {
        store.login({ email: email.value, password: password.value });
      },
    };
  },
});
</script>
