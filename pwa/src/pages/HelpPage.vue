<template>
  <custom-card
    title="Ajuda"
    subtitle="Perguntas Frequentes"
    style="width: 100%"
  >
    <div class="q-pa-md q-gutter-sm">
      <q-tree
        :nodes="simple"
        node-key="label"
        no-connectors
        v-model:expanded="expanded"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <q-icon :name="prop.node.icon" color="secondary" class="q-mr-sm" />
            <div v-if="prop.node.document">
              <a
                href="#"
                class="text-primary text-weight-light"
                @click="showDialog(prop.node)"
              >
                {{ prop.node.label }}
              </a>
            </div>
            <div v-else class="text-weight-normal text-primary">
              {{ prop.node.label }}
            </div>
          </div>
        </template>
      </q-tree>
    </div>
  </custom-card>
</template>

<script>
import CustomCard from "src/components/CustomCard.vue";
import { generalInformationDoc } from "src/components/Help/GeneralInformationDoc";
import { Dialog } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelpPage",
  components: {
    "custom-card": CustomCard,
  },
  data() {
    return {
      simple: [
        {
          label: "Módulo de Análise",
          icon: "mdi-scale",
          children: [
            {
              label: "Avaliação Antropométrica",
              icon: "mdi-ruler",
              children: [
                {
                  label: "Informações Gerais",
                  children: generalInformationDoc,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    showDialog(content) {
      Dialog.create({
        ...content,
        class: "title text-primary",
        html: true,
        style: {
          width: "500px",
        },
      });
    },
  },
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
