<template>
  <div class="q-mt-md q-mr-sm">
    <div class="row justify-center">
      <q-input
        v-model="arm"
        filled
        dense
        type="number"
        label="Braço (cm.)"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== 0) || 'Circunferência do braço.',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
      <q-input
        v-model="wrist"
        filled
        dense
        type="number"
        label="Punho (cm.)"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== 0) || 'Circunferência do punho.',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
    </div>
    <div class="row justify-center q-mt-sm">
      <q-input
        v-model="waist"
        filled
        dense
        type="number"
        label="Cintura (cm.)"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== 0) || 'Circunferência da cintura.',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
      <q-input
        v-model="abdomen"
        filled
        dense
        type="number"
        label="Abdome (cm.)"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== 0) || 'Circunferência abdominal',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
    </div>

    <div class="row justify-center q-mt-sm">
      <q-input
        v-model="hip"
        filled
        dense
        type="number"
        label="Quadril (cm.)"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== 0) || 'Circunferência do quadril',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
      <q-input
        v-model="calf"
        filled
        dense
        type="number"
        label="Panturrilha (cm.)"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== 0) || 'Circunferência da panturrilha.',
        ]"
        class="col-md-6 col-sm-12 q-pr-sm"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnalisysSecondStep",
  data() {
    return {
      arm: null,
      wrist: null,
      waist: null,
      abdomen: null,
      hip: null,
      calf: null,
    };
  },
  watch: {
    payload() {
      this.$emit("updatePayload", this.payload);
    },
  },
  computed: {
    payload() {
      return {
        circumferences: {
          arm: this.arm,
          wrist: this.wrist,
          waist: this.waist,
          abdomen: this.abdomen,
          hip: this.hip,
          calf: this.calf,
        },
      };
    },
  },
});
</script>
