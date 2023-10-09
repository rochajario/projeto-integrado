<template>
  <q-btn
    label="Novo Paciente"
    icon="mdi-account-multiple-plus-outline"
    color="primary"
    @click="visible = true"
  />

  <q-dialog
    v-model="visible"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <custom-card
      :title="title"
      :subtitle="subtitle"
      class="q-px-sm"
      style="width: 500px"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Nome"
          hint="Nome do Paciente"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor informe o nome do paciente',
          ]"
        />
        <q-input
          filled
          v-model="email"
          label="E-mail"
          hint="Email do Paciente"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por favor informe o e-mail do paciente',
            (val) =>
              /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(val) ||
              'Por favor informe um e-mail valido',
          ]"
        />
        <q-select
          filled
          v-model="genre"
          :options="options"
          label="Identidade Biológica"
          :rules="[
            (val) =>
              val !== null || 'Por favor informe uma identidade biológica',
          ]"
        />
        <q-input
          filled
          v-model="birthdate"
          label="Data de Nascimento"
          readonly
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por favor informe a data de nascimento',
          ]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date minimal v-model="birthdate" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Selecionar"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="row justify-end">
          <q-btn
            label="Cancelar"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
          />
          <q-btn
            flat
            label="Concluir"
            type="submit"
            color="primary"
            :disable="!payload"
          />
        </div>
      </q-form>
    </custom-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import CustomCard from "../CustomCard.vue";

export default defineComponent({
  name: "PatientForm",
  components: {
    "custom-card": CustomCard,
  },
  props: {
    updateItem: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      //Component Data
      updateAction: false,
      visible: false,
      options: [
        {
          label: "Masculino",
          value: 1,
        },
        {
          label: "Feminino",
          value: 2,
        },
      ],

      //User Data
      name: "",
      email: "",
      genre: null,
      birthdate: null,
    };
  },
  computed: {
    title() {
      return this.updateAction
        ? `Atualização de Paciente`
        : `Cadastro de Paciente`;
    },
    subtitle() {
      return this.updateAction
        ? `Modificar dados básicos de paciente`
        : `Adicionar novo paciente ao sistema`;
    },
    payload() {
      if (!this.birthdate) {
        return null;
      }

      return {
        name: this.name,
        email: this.email,
        genre: this.genre.value,
        birthdate: this.parseLocalDate(this.birthdate),
      };
    },
  },
  watch: {
    "updateItem.toggleActuator"() {
      this.name = this.updateItem.payload.name;
      this.email = this.updateItem.payload.email;
      this.genre = this.options.filter(
        (x) => x.value == this.updateItem.payload.genre
      )[0];
      this.birthdate = this.setDate(this.updateItem.payload.birthdate);

      this.updateAction = true;
      this.visible = true;
    },
  },
  methods: {
    setDate(value) {
      let date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR");
    },
    parseLocalDate(date) {
      const destructedDate = date.split("/");
      return new Date(
        `${destructedDate[2]}-${destructedDate[1]}-${destructedDate[0]}`
      )
        .toISOString()
        .split("T")[0];
    },
    close() {
      this.updateAction = false;
      this.visible = false;

      this.name = "";
      this.email = "";
      this.genre = null;
      this.birthdate = null;
    },
    onReset() {
      this.close();
    },
    onSubmit() {
      if (this.updateAction) {
        this.$emit("onUpdatePatient", {
          patientId: this.updateItem.payload.patientId,
          ...this.payload,
        });
        this.close();
        return;
      }
      this.$emit("onCreatePatient", this.payload);
      this.close();
    },
  },
});
</script>
