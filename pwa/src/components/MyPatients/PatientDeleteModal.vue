<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="visible"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <custom-card
        title="Remover Paciente"
        subtitle="Tem certeza que deseja fazer isso?"
      >
        <div class="column justify-center">
          <span class="text-weight-thin text-center">
            Esta ação é irreversível, todos os dados relacionados ao paciente
            serão removidos.
          </span>
          <span class="row justify-end q-mt-md q-gutter-md">
            <q-btn flat color="negative" label="Cancelar" @click="close" />
            <q-btn flat color="primary" label="Prosseguir" @click="onDelete" />
          </span>
        </div>
      </custom-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import CustomCard from "../CustomCard.vue";

export default defineComponent({
  name: "PatientDeleteModal",
  components: {
    "custom-card": CustomCard,
  },
  props: {
    deleteItem: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      visible: false,
      patientId: 0,
    };
  },
  watch: {
    deleteItem() {
      if (!this.visible && this.deleteItem != 0) {
        this.patientId = this.deleteItem;
        this.visible = true;
      }
    },
  },
  methods: {
    close() {
      this.patientId = 0;
      this.visible = false;
      this.$emit("onClose");
    },
    onDelete() {
      this.$emit("onDelete", this.patientId);
      this.close();
    },
  },
});
</script>
