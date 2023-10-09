<template>
  <q-form @submit="onSubmit" @reset="onReset" class="row wide">
    <div class="col-md-6 q-px-sm col-12">
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
    </div>
    <div class="col-md-6 q-px-sm col-12">
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
    </div>
    <div class="col-md-6 q-px-sm col-12">
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
    </div>
    <div class="col-md-6 q-px-sm col-12">
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

      <div class="row justify-end">
        <q-btn
          label="Cancelar"
          class="q-mr-md"
          type="reset"
          flat
          color="negative"
        />
        <q-btn label="Atualizar" type="submit" flat color="primary" />
      </div>
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user-store";

export default defineComponent({
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  },
  computed: {
    userStateData() {
      return useUserStore().getUserData;
    },
    payload() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    onReset() {
      this.firstName = this.userStateData.firstName;
      this.lastName = this.userStateData.lastName;
      this.email = this.userStateData.email;
      this.password = null;
    },
    onSubmit() {
      this.$emit("onUpdate", this.payload);
    },
  },
  mounted() {
    this.onReset();
  },
});
</script>
<style scoped>
.wide {
  width: 100%;
}
</style>
