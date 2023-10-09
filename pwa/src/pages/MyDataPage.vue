<template>
  <custom-card
    title="Meus Dados"
    subtitle="Alterar meus dados pessoais"
    class="q-px-sm"
  >
    <personal-info-form @onUpdate="updateUserInfo" />
  </custom-card>
</template>

<script>
import CustomCard from "src/components/CustomCard.vue";
import PersonalInfoForm from "src/components/MyData/PersonalInfoForm.vue";

import { Notify } from "quasar";
import { Loading } from "quasar";

import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user-store";

export default defineComponent({
  components: {
    "custom-card": CustomCard,
    "personal-info-form": PersonalInfoForm,
  },
  computed: {
    store() {
      return useUserStore();
    },
  },
  methods: {
    updateUserInfo(data) {
      Loading.show();
      this.$api
        .patch("user/profile", data)
        .then(() => {
          this.store.setUserData();
        })
        .then(() => {
          Notify.create({
            color: "positive",
            message: "Dados de usuário atualizados com sucesso.",
          });
        })
        .catch(() => {
          Notify.create({
            color: "negative",
            message: "Não foi atualizar dados de usuário.",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    },
  },
});
</script>
