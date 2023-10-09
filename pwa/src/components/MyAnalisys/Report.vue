<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="visible"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <custom-card
        title="Relatório de Análise"
        subtitle="Formato para impressão"
      >
        <div class="column justify-center">
          <section
            v-if="reportData"
            class="text-weight-thin text-center q-pa-md row items-start q-gutter-md page"
          >
            <q-card class="my-card" flat bordered>
              <q-item>
                <q-item-section class="text-left">
                  <q-item-label class="title text-primary"
                    >Relatório Antropométrico</q-item-label
                  >
                  <q-item-label caption> Informações Gerais </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-card-section horizontal>
                <q-card-section class="column justify-center text-align-left">
                  <ul>
                    <li
                      v-for="desc in reportData.antropometry.description"
                      :key="desc"
                    >
                      {{ desc }}
                    </li>
                  </ul>
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="col-5 q-pa-md">
                  <q-chip
                    v-model:selected="reportData.antropometry.bmr"
                    color="primary"
                    text-color="white"
                  >
                    {{
                      `IMC: ${Number(reportData.antropometry.bmr).toFixed(2)}`
                    }}
                  </q-chip>
                  <q-chip
                    v-model:selected="reportData.antropometry.bmr"
                    color="primary"
                    text-color="white"
                  >
                    {{ reportData.antropometry.bmrClass }}
                  </q-chip>
                  <q-chip
                    v-model:selected="reportData.antropometry.bmr"
                    color="primary"
                    text-color="white"
                  >
                    {{
                      `Peso Ideal: ${Number(
                        reportData.antropometry.idealWeight
                      ).toFixed(2)}`
                    }}
                  </q-chip>
                </q-card-section>
              </q-card-section>
            </q-card>
          </section>
          <span class="row justify-end q-mt-md q-gutter-md print-hidden">
            <q-btn flat color="negative" label="Cancelar" @click="close" />
            <q-btn flat color="primary" label="Imprimir" @click="print" />
          </span>
        </div>
      </custom-card>
    </q-dialog>
  </div>
</template>
<script>
import { Notify, Loading } from "quasar";
import { defineComponent } from "vue";
import CustomCard from "../CustomCard.vue";

export default defineComponent({
  name: "AnalisysReportModal",
  components: {
    "custom-card": CustomCard,
  },
  props: {
    reportItem: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      visible: false,
      analisysId: 0,
      reportData: null,
      analisysData: null,
      patientData: null,
      date: null,
    };
  },
  watch: {
    reportItem(value) {
      if (!this.visible && this.reportItem != 0) {
        this.loadData(value);
        this.visible = true;
      }
    },
  },
  methods: {
    loadData(analisysId) {
      Loading.show({
        message: "Processando Análise",
      });
      this.analisysId = this.reportItem;

      this.$api
        .get(`analisys/${this.analisysId}`)
        .then((res) => {
          this.analisysData = res.data;
          console.log(this.analisysData);
        })
        .then(() => {
          this.getPatientData();
        })
        .then(() => {
          this.getReportData();
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível gerar relatório de análise.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
    getPatientData() {
      this.$api.get(`patient/${this.analisysData.patientId}`).then((res) => {
        this.patientData = res.data;
      });
    },
    getReportData() {
      this.$api.post(`analisys/produce/${this.analisysId}`).then((res) => {
        this.reportData = res.data;
      });
    },
    close() {
      this.analisysId = 0;
      this.visible = false;
      this.reportData = null;
      this.$emit("onClose");
    },
    print() {
      window.print();
    },
    getAnalisysReport(analisysId) {
      Loading.show();
      this.$api
        .post(`analisys/produce/${analisysId}`)
        .then((res) => {
          this.reportData = res.data;
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi possível gerar relatório de análise.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
  },
});
</script>
<style scoped>
@media print {
  @page {
    size: A4;
  }
  .page {
    top: 0;
    width: 100%;
  }
  .print-hidden {
    visibility: hidden;
  }
}
</style>
