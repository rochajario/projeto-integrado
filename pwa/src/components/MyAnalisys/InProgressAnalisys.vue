<template>
  <custom-card
    v-show="isCurrentAnalisys"
    title="Análise em Progresso"
    :subtitle="cardSubtitle"
    style="margin-right: 0 !important"
  >
    <div class="q-px-md q-pt-sm">
      <q-timeline dense color="grey">
        <q-timeline-entry icon="mdi-clipboard-list">
          <template v-slot:subtitle> Formulário Pré Consulta </template>
          <div class="text-weight-light">Ação Indisponível</div>
        </q-timeline-entry>

        <q-timeline-entry icon="mdi-magnify">
          <template v-slot:subtitle> Anamnese </template>
          <div class="text-weight-light">Ação Indisponível</div>
        </q-timeline-entry>

        <q-timeline-entry
          color="positive"
          icon="mdi-human"
          style="margin-bottom: 0"
        >
          <template v-slot:subtitle> Avaliação Antropométrica </template>
          <div class="q-gutter-md q-mt-sm">
            <div class="text-weight-light column justify-center q-mr-xl">
              <q-btn
                flat
                dense
                icon="mdi-information-outline"
                label="Informações"
                class="text-primary q-mb-sm"
                @click="moveTo({ name: 'Ajuda' })"
              >
                <q-tooltip anchor="bottom middle" self="top middle">
                  Informações sobre medições e guia de antropometria
                </q-tooltip>
              </q-btn>
              <span class="row justify-center">
                <ul class="q-mb-sm">
                  <li>Índices Gerais</li>
                  <li>Avaliação de Gasto Calórico</li>
                  <li>Avaliação de Circunferências</li>
                  <li>Avaliação de Massa Corpórea</li>
                </ul>
              </span>

              <div class="row justify-center">
                <slot name="antropometryActuator">
                  <!-- Inject antropometry actuator here -->
                </slot>
              </div>
            </div>
          </div>
        </q-timeline-entry>

        <q-timeline-entry color="primary" icon="mdi-check">
          <template v-slot:subtitle> Dados da Análise </template>
          <div
            class="text-weight-light text-primary row justify-center q-mr-xl"
          >
            <q-tree
              :nodes="validationData"
              node-key="label"
              no-nodes-label="Nenhum dado informado."
              no-connectors
              style="width: 100%"
            >
              <template v-slot:default-header="prop">
                <div class="row items-center">
                  <q-icon
                    :name="prop.node.icon"
                    color="secondary"
                    class="q-mr-sm"
                  />
                  <div class="text-weight-normal text-primary">
                    {{ prop.node.label }}
                  </div>
                </div>
              </template>
            </q-tree>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </custom-card>
</template>

<script>
import { defineComponent } from "vue";
import Router from "src/router";
import CustomCard from "../CustomCard.vue";
import { VerificationUtility } from "./Verification/VerificationUtility";

export default defineComponent({
  name: "InProgressAnalisys",
  components: {
    "custom-card": CustomCard,
  },
  props: {
    isCurrentAnalisys: {
      type: Boolean,
      required: true,
    },
    analisys: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      validationData: [],
    };
  },
  watch: {
    analisys(value) {
      if (value) {
        this.validationData = [];
        this.validationData = this.verificationUtility.buildVerifications(
          this.analisys.antropometry
        );
      }
    },
  },
  computed: {
    verificationUtility() {
      return new VerificationUtility();
    },
    cardSubtitle() {
      return this.analisys
        ? `Atualizado em: ${new Date(this.analisys.lastUpdate)
            .toLocaleString("pt-BR")
            .replace(",", " às")}`
        : "Análise de Paciente";
    },
  },
  methods: {
    moveTo(route) {
      Router.push(route);
    },
  },
});
</script>

<style></style>
