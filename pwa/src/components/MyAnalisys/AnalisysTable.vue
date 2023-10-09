<template>
  <custom-card :title="patientName" subtitle="Análises de paciente">
    <q-table
      flat
      :rows="analisys"
      row-key="analisysId"
      :columns="columns"
      class="text-weight-light text-primary"
    >
      <template v-slot:top-right>
        <q-btn
          icon="mdi-clipboard-edit-outline"
          label="Nova Análise"
          color="primary"
          :disable="analisysInProgress"
          @click="createNewAnalisys"
        />
      </template>
      <template v-slot:body-cell-actualState="props">
        <q-td :props="props">
          <q-chip
            :color="actualStateProps(props.row.actualState).color"
            :icon="actualStateProps(props.row.actualState).icon"
            text-color="white"
            class="text-weight-bold"
          >
            {{ actualStateProps(props.row.actualState).label }}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-analisysId="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            icon="mdi-clipboard-check-outline"
            aria-label="Concluir Análise"
            color="secondary"
            :disable="props.row.actualState != 1"
            @click="concludeAnalisys(props.row.analisysId)"
          >
            <q-tooltip> Concluir Análise </q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="mdi-clipboard-pulse-outline"
            aria-label="Obter Relatório"
            color="primary"
            class="q-ml-sm"
            @click="getAnalisysReport(props.row.analisysId)"
            :disable="props.row.actualState != 2"
          >
            <q-tooltip> Obter Relatório </q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="mdi-clipboard-alert-outline"
            aria-label="Remover Análise"
            color="negative"
            class="q-ml-sm"
            @click="setDeleteAnalisys(props.row.analisysId)"
          >
            <q-tooltip> Remover Análise </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data>
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" name="mdi-account-alert" />
          <span>Nenhuma análise realizada</span>
        </div>
      </template>
    </q-table>
    <delete-modal
      :deleteItem="deleteModalPatientId"
      @onClose="resetDeleteItem"
      @onDelete="deleteAnalisys"
    />
    <report-modal
      :reportItem="reportModalAnalisysId"
      @onClose="resetReportItem"
    />
  </custom-card>
</template>

<script>
import { Notify, Loading } from "quasar";
import { defineComponent } from "vue";
import CustomCard from "../CustomCard.vue";
import AnalisysDeleteModal from "./AnalisysDeleteModal.vue";
import Report from "./Report.vue";

export default defineComponent({
  name: "AnalisysTable",
  components: {
    "custom-card": CustomCard,
    "delete-modal": AnalisysDeleteModal,
    "report-modal": Report,
  },
  props: {
    patientName: {
      type: String,
      required: false,
    },
    analisys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      deleteModalPatientId: 0,
      reportModalAnalisysId: 0,
      columns: [
        {
          name: "previousInformation",
          align: "left",
          label: "Pré Consulta",
          field: "previousInformation",
          sortable: false,
          field: (row) => row.previousInformation,
          format: (val) => (!val ? "Não Realizada" : "Concluída"),
        },
        {
          name: "anamnese",
          align: "center",
          label: "Anamnese",
          field: "anamnese",
          sortable: false,
          field: (row) => row.anamnese,
          format: (val) => (!val ? "Não Realizada" : "Concluída"),
        },
        {
          name: "antropometry",
          align: "center",
          label: "Antropometria",
          field: "antropometry",
          sortable: false,
          field: (row) => row.antropometry,
          format: (val) => (!val ? "Não Realizada" : "Concluída"),
        },
        {
          name: "lastUpdate",
          align: "center",
          label: "Última Atualização",
          field: (row) => row.lastUpdate,
          format: (val) => new Date(val).toLocaleString("pt-BR"),
          sortable: true,
        },
        {
          name: "actualState",
          required: true,
          label: "Status",
          align: "center",
          field: "actualState",
          sortable: true,
        },
        {
          name: "analisysId",
          required: true,
          label: "Ações",
          field: "analisysId",
          align: "right",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    analisysInProgress() {
      return this.analisys.some((x) => x.actualState == 1);
    },
  },
  methods: {
    createNewAnalisys() {
      this.$emit("onNewAnalisys", true);
    },
    concludeAnalisys(analisysId) {
      Loading.show();
      this.$api
        .put(`analisys/conclude/${analisysId}`)
        .then((res) => {
          Notify.create({
            color: "positive",
            message: "Análise concluída com sucesso.",
          });
          this.$emit("onUpdateSpecificAnalisys", res.data);
        })
        .catch((err) => {
          const errMessage = [400, 500].includes(err.status)
            ? "Falha ao concluir análise."
            : "Dados de análise precisam ser preenchidos.";
          Notify.create({
            color: "negative",
            message: errMessage,
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    setDeleteAnalisys(analisysId) {
      this.deleteModalPatientId = analisysId;
    },
    resetDeleteItem() {
      this.deleteModalPatientId = 0;
    },
    resetReportItem() {
      this.reportModalAnalisysId = 0;
    },
    getAnalisysReport(analisysId) {
      this.reportModalAnalisysId = analisysId;
    },
    deleteAnalisys(analisysId) {
      Loading.show();
      this.$api
        .delete(`analisys/${analisysId}`)
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Análise removida com sucesso.",
          });
        })
        .then(() => {
          this.$emit("onUpdateAllAnalisys");
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Falha ao remover análise.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    actualStateProps(stateId) {
      return {
        icon: stateId == 1 ? "mdi-clock-alert" : "mdi-check-circle",
        color: stateId == 1 ? "primary" : "positive",
        label: stateId == 1 ? "Em Andamento" : "Concluída",
      };
    },
  },
});
</script>
