<template>
  <q-page class="flex flex-start row">
    <in-progress-analisys
      :isCurrentAnalisys="isCurrentAnalisys"
      :patientData="patientData"
      :analisys="currentAnalisys"
      class="col-12 col-md-4"
    >
      <template v-slot:antropometryActuator>
        <antropometry-form
          :patient="patientData"
          @onAntropometryConcluded="updateAnalisysPatient"
        />
      </template>
    </in-progress-analisys>

    <analisys-table
      v-if="patientData"
      :analisys="analisys"
      :patientName="patientData.name"
      :class="isCurrentAnalisys ? 'col-12 col-md-8' : 'col-12 col-md-12'"
      @onNewAnalisys="setNewAnalisys"
      @onUpdateAllAnalisys="getAnalisysData"
      @onUpdateSpecificAnalisys="updateSpecificAnalisys"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Notify, Loading } from "quasar";
import Router from "src/router";
import AntropometryFrormVue from "src/components/MyAnalisys/Antropometry/AntropometryForm.vue";
import InProgressAnalisys from "src/components/MyAnalisys/InProgressAnalisys.vue";
import AnalisysTable from "src/components/MyAnalisys/AnalisysTable.vue";

export default defineComponent({
  name: "MyAnalisysPage",
  components: {
    "analisys-table": AnalisysTable,
    "in-progress-analisys": InProgressAnalisys,
    "antropometry-form": AntropometryFrormVue,
  },
  data() {
    return {
      patientData: null,
      analisys: [],
      selectedAnalisys: {},
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    isCurrentAnalisys() {
      return this.analisys.some((x) => x.actualState == 1);
    },
    currentAnalisys() {
      const selected = this.analisys.findLast((x) => x.actualState == 1);
      return !selected
        ? {
            antropometry: null,
          }
        : selected;
    },
  },
  methods: {
    initialize() {
      this.getPatientData();
    },
    getPatientData() {
      const patientId = Router.currentRoute.value.params.patientId;
      Loading.show();
      this.$api
        .get(`patient/${patientId}`)
        .then((res) => {
          this.patientData = res.data;
          this.getAnalisysData();
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível encontrar os dados do paciente.",
          });
          Router.push({ name: "Meus Pacientes" });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    updateSpecificAnalisys(payload) {
      this.analisys = this.analisys.map((item) =>
        item.analisysId !== payload.analisysId ? item : payload
      );
    },
    getAnalisysData() {
      this.$api.get(`analisys/${this.patientData.patientId}`).then((res) => {
        this.analisys = res.data;
      });
    },
    updateAnalisysPatient(payload) {
      const analisysId = this.analisys.findLast(
        (x) => x.actualState == 1
      ).analisysId;

      Loading.show();

      this.$api
        .patch(`analisys/${analisysId}`, payload)
        .then((res) => {
          this.updateSpecificAnalisys(res.data);
          Notify.create({
            color: "positive",
            message: "Dados de análise atualizados com sucesso.",
          });
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível atualizar dados de análise.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    setNewAnalisys() {
      Loading.show();
      this.$api
        .post("analisys", { patientId: this.patientData.patientId })
        .then((res) => {
          this.analisys.push(res.data);
          Notify.create({
            color: "positive",
            message: "Nova análise criada com sucesso.",
          });
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível criar nova análise.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
  },
});
</script>
