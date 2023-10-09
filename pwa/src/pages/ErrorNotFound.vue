<template>
  <div
    class="fullscreen bg-secondary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <img
        alt="Erro 404 - Nada Encontrado"
        src="~assets/not-found-404.svg"
        style="width: 600px; height: auto"
      />

      <div class="text-h2" style="opacity: 0.4">
        Hmm, Nada por aqui ainda...
      </div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        unelevated
        to="/"
        label="Voltar para a Página Inicial"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
