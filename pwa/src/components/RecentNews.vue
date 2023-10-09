<template>
  <custom-card
    title="Novidades"
    subtitle="Funcionalidades disponibilizadas recentemente"
    style="width: 100%"
  >
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn
          v-if="active"
          size="md"
          icon="mdi-lightbulb-on"
          color="secondary"
          flat
          round
          dense
          @click="onClick"
        />
        <q-btn
          v-else
          size="sm"
          :icon="btnProps.icon"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
      </template>

      <q-carousel-slide
        :name="item.id"
        v-for="item in news"
        :key="item.id"
        class="column no-wrap flex-center"
      >
        <q-icon :name="item.icon" size="56px" />
        <div class="q-mt-md text-center">
          {{ item.description }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </custom-card>
</template>

<script>
import CustomCard from "./CustomCard.vue";

export default {
  components: {
    "custom-card": CustomCard,
  },
  data() {
    return {
      slide: 0,
      news: [
        {
          id: 0,
          icon: "mdi-gift",
          description:
            "Bem vindo à versão Beta do Consultório Nutritia, este serviço visa tornar a rotina de profissionais da área de Nutrição mais fácil, sendo uma ferramenta de apoio valiosa para análise e acompanhamento de pacientes, facilitando prescrição de dietas e fornecendo um arcabouço completo para a conduta nutricional.",
        },
        {
          id: 1,
          icon: "mdi-stethoscope",
          description:
            "O Módulo de análise está agora em desenvolvimento, em breve estarão disponíveis funcionalidades que lhe permitirão avaliar clinicamente seus pacientes e obter informações úteis para composição e prescrição de dietas com agilidade e praticidade.",
        },
      ],
    };
  },
};
</script>
