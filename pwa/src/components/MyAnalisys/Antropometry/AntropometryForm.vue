<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      outline
      rounded
      color="secondary"
      icon-right="mdi-human"
      label="Preencher"
      @click="visible = !visible"
    />
    <q-dialog
      v-model="visible"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <custom-card
        title="Antropometria de Paciente"
        subtitle="Análise antropométrica de paciente"
        style="width: 650px"
      >
        <section id="analisys-information" class="column justify-center">
          <q-stepper
            flat
            v-model="step"
            vertical
            color="primary"
            animated
            style="padding-bottom: 0"
          >
            <q-step
              :name="1"
              title="Informações Gerais"
              icon="mdi-comment-account"
              :done="step > 1"
            >
              <step-one
                :patientData="patient"
                @updatePayload="updateAntropometry"
              />

              <q-stepper-navigation class="row justify-center q-mr-xl">
                <q-btn
                  flat
                  @click="step = 2"
                  color="positive"
                  icon="mdi-arrow-down"
                  label="Próximo"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Circunferências"
              caption="Opcional"
              icon="mdi-android-studio"
              :done="step > 2"
            >
              <step-two @updatePayload="updateAntropometry" />
              <q-stepper-navigation
                class="row justify-center q-gutter-sm q-mr-xl"
              >
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  icon="mdi-arrow-up"
                  label="Anterior"
                />
                <q-btn
                  flat
                  @click="step = 3"
                  color="positive"
                  icon="mdi-arrow-down"
                  label="Próximo"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Dobras Cutâneas"
              caption="Opcional"
              icon="mdi-human"
              :done="step > 3"
            >
              <step-three @updatePayload="updateAntropometry" />
              <q-stepper-navigation
                class="row justify-center q-gutter-sm q-mr-xl"
              >
                <q-btn
                  flat
                  @click="step = 2"
                  color="primary"
                  icon="mdi-arrow-up"
                  label="Anterior"
                />
                <q-btn
                  flat
                  @click="openValidation"
                  color="positive"
                  icon="mdi-check"
                  label="Próximo"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="Validação" icon="mdi-check" />
          </q-stepper>
        </section>
        <span class="row justify-end q-mt-md">
          <q-btn flat color="negative" label="Cancelar" @click="close" />
          <q-btn
            flat
            color="primary"
            label="Finalizar"
            :disable="step != 4"
            @click="emitAntropometryConcluded"
          />
        </span>
      </custom-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import CustomCard from "src/components/CustomCard.vue";
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";

export default defineComponent({
  name: "AnalisysPatientForm",
  components: {
    "custom-card": CustomCard,
    "step-one": FirstStep,
    "step-two": SecondStep,
    "step-three": ThirdStep,
  },
  props: {
    patient: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      step: 1,
      antropometry: null,
    };
  },
  mounted() {
    this.configureAntropometry();
  },
  computed: {
    analisys() {
      return {
        patientId: this.patient.patientId,
        antropometry: this.antropometry,
      };
    },
  },
  methods: {
    updateAntropometry(payload) {
      this.antropometry = Object.assign(this.antropometry, payload);
    },
    configureAntropometry() {
      this.antropometry = {
        generalInformation: null,
        circumferences: null,
        skinFold: null,
      };
    },
    openValidation() {
      if (!this.antropometry.generalInformation.activityFactor) {
        Notify.create({
          color: "negative",
          message: "Necessário preenchimento de 'Informações Gerais'",
        });
        return;
      }
      this.step = 4;
    },
    close() {
      this.visible = false;
      this.step = 1;
    },

    emitAntropometryConcluded() {
      this.$emit("onAntropometryConcluded", this.analisys);
      this.close();
    },
  },
});
</script>
