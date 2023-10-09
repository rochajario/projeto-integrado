<template>
  <custom-card title="Meus Pacientes" subtitle="Gerenciamento de Pacientes">
    <q-table
      flat
      :rows="patientList"
      :columns="columns"
      row-key="name"
      class="text-weight-light text-primary"
    >
      <template v-slot:top-right>
        <slot name="header">
          <!-- Inner component here -->
        </slot>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-h4 text-primary text-weight-bolder"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-patientId="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            icon="mdi-account-search"
            aria-label="Realizar Análise"
            color="secondary"
            @click="moveToAnalisys(props.value)"
          >
            <q-tooltip>Análises de Paciente</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="mdi-account-edit"
            aria-label="Atualizar Paciente"
            color="primary"
            class="q-ml-sm"
            @click="onUpdate(props.row)"
          >
            <q-tooltip>Atualizar Paciente</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="mdi-account-remove"
            aria-label="Remover Paciente"
            color="negative"
            class="q-ml-sm"
            @click="onDelete(props.value)"
          >
            <q-tooltip>Remover Paciente</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data>
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" name="mdi-account-alert" />
          <span>Nenhum paciente cadastrado</span>
        </div>
      </template>
    </q-table>
  </custom-card>
</template>

<script>
import { defineComponent } from "vue";
import Router from "src/router";
import CustomCard from "../CustomCard.vue";

export default defineComponent({
  components: {
    "custom-card": CustomCard,
  },
  props: {
    patientList: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Nome do Paciente",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "birthdate",
          align: "center",
          label: "Data de Nascimento",
          field: (row) => row.birthdate,
          format: (val) => this.setDate(val),
          sortable: true,
        },
        {
          name: "lastAnalisys",
          align: "center",
          label: "Última Análise",
          field: (row) => row.lastAnalisys,
          format: (val) =>
            val != null
              ? `${new Date(val).toLocaleString("pt-BR")}`
              : "Aguardando Análise",
          sortable: true,
        },
        {
          name: "genre",
          align: "center",
          label: "Identidade Biológica",
          field: (row) => row.genre,
          format: (val) => (val == 1 ? "Masculino" : "Feminino"),
          sortable: true,
        },
        {
          name: "patientId",
          required: true,
          label: "Ações",
          align: "right",
          field: "patientId",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    setDate(value) {
      let date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR");
    },
    moveToAnalisys(patientId) {
      Router.push({ name: "Análises", params: { patientId: patientId } });
    },
    onNewPatient() {
      this.$emit("newPatient");
    },
    onDelete(patientId) {
      this.$emit("onDelete", patientId);
    },
    onUpdate(patientData) {
      this.$emit("onUpdate", patientData);
    },
  },
});
</script>
