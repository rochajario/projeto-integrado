<template>
  <div class="q-mt-md q-mr-sm">
    <q-input
      filled
      dense
      v-model="height"
      type="number"
      label="Altura (cm.)"
      lazy-rules
      class="q-mb-sm"
      :rules="[
        (val) =>
          (val !== null && val !== 0) || 'Por favor informe uma altura válida',
      ]"
    />
    <q-input
      filled
      dense
      v-model="weight"
      type="number"
      label="Peso (kg.)"
      lazy-rules
      class="q-mb-sm"
      :rules="[
        (val) =>
          (val !== null && val !== 0) || 'Por favor informe um peso válido',
      ]"
    />
    <q-select
      filled
      dense
      options-dense
      label="Fator de Atividade"
      v-model="activityFactor"
      :options="activityOptions"
      :rules="[
        (val) => val !== null || 'Por favor informe um fator de atividade',
      ]"
    />
    <div id="info-area" v-if="activityFactor" class="row wrap q-gutter-sm">
      <q-badge :color="activityFactor.color">
        {{ activityFactor.description }}
      </q-badge>
      <q-badge color="primary" multi-line>
        {{ activityFactorInfo }}
      </q-badge>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnalisysFirstStep",
  props: {
    patientData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      height: null,
      weight: null,
      age: null,
      activityFactor: null,
      activityOptions: [
        {
          label: "Pouco ou nenhum exercício ",
          description: "Sedentário",
          color: "negative",
          value: 1.2,
        },
        {
          label: "Exercício leve 1 a 3 dias por semana",
          description: "Levemente ativo(a)",
          color: "warning",
          value: 1.375,
        },
        {
          label: "Exercício moderado, faz esportes 3 a 5 dias por semana",
          description: "Moderadamente ativo(a)",
          color: "info",
          value: 1.55,
        },
        {
          label: "Exercício pesado de 5 a 6 dias por semana",
          description: "Altamente ativo(a)",
          color: "accent",
          value: 1.725,
        },
        {
          label: "Exercício pesado diariamente e até 2 vezes por dia",
          description: "Extremamente ativo(a)",
          color: "positive",
          value: 1.9,
        },
      ],
    };
  },
  created() {
    this.age = this.getCurrentAge(this.patientData.birthdate);
  },
  watch: {
    payload() {
      this.$emit("updatePayload", this.payload);
    },
  },
  methods: {
    getCurrentAge(birth) {
      const birthdate = new Date(birth);

      const currentTime = moment();
      const birtdateTime = moment({
        year: birthdate.getFullYear(),
        month: birthdate.getMonth(),
        day: birthdate.getDate(),
      });

      return currentTime.diff(birtdateTime, "years");
    },
  },
  computed: {
    payload() {
      return {
        generalInformation: {
          age: this.age,
          height: this.height,
          weight: this.weight,
          activityFactor: this.activityFactor,
          genre: this.patientData.genre,
        },
      };
    },
    activityFactorInfo() {
      return `Fator de Atividade: ${this.activityFactor.value}`;
    },
  },
});
</script>
