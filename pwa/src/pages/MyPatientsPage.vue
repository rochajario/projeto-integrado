<template>
  <patients-table
    @onDelete="setDeleteItem"
    @onUpdate="setUpdateItem"
    @onAnalysisPatient="setAnalysisPatient"
    :patientList="patients"
  >
    <template v-slot:header>
      <div class="row justify-end">
        <patient-form
          :updateItem="updateItem"
          @onUpdatePatient="updateApiCall"
          @onCreatePatient="createApiCall"
        />
      </div>
    </template>
  </patients-table>
  <patient-delete-modal
    :deleteItem="deleteItem"
    @onClose="resetDeleteItem"
    @onDelete="deleteApiCall"
  />
</template>

<script>
import PatientDeleteModal from "src/components/MyPatients/PatientDeleteModal.vue";
import PatientForm from "src/components/MyPatients/PatientForm.vue";
import PatientsTable from "src/components/MyPatients/PatientsTable.vue";

import { Notify } from "quasar";
import { Loading } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    "patients-table": PatientsTable,
    "patient-form": PatientForm,
    "patient-delete-modal": PatientDeleteModal,
  },
  data() {
    return {
      deleteItem: 0,
      analisysPatient: {
        toggleActuator: 0,
        payload: null,
      },
      updateItem: {
        toggleActuator: 0,
        payload: null,
      },
      patients: [],
    };
  },
  mounted() {
    this.readApiCall();
  },
  methods: {
    setDeleteItem(patientId) {
      this.deleteItem = patientId;
    },
    resetDeleteItem() {
      this.deleteItem = 0;
    },
    setUpdateItem(patientData) {
      this.updateItem.payload = patientData;
      this.updateItem.toggleActuator++;
    },
    setAnalysisPatient(patientData) {
      this.analisysPatient.payload = patientData;
      this.analisysPatient.toggleActuator++;
    },
    readApiCall() {
      Loading.show();
      this.$api
        .get("patient")
        .then((res) => {
          this.patients = res.data;
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível obter lista de pacientes.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    updateApiCall(value) {
      Loading.show();
      this.$api
        .patch(`patient/${value.patientId}`, value)
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Dados de paciente atualizados com sucesso.",
          });
        })
        .then(() => {
          this.readApiCall();
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível atualizar dados de paciente.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    createApiCall(value) {
      Loading.show();
      this.$api
        .post("patient", value)
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Novo paciente cadastrado com sucesso.",
          });
        })
        .then(() => {
          this.readApiCall();
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível cadastrar novo paciente.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    deleteApiCall(value) {
      Loading.show();
      this.$api
        .delete(`patient/${value}`)
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Paciente removido com sucesso.",
          });
        })
        .then(() => {
          this.readApiCall();
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível remover paciente.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
  },
});
</script>
