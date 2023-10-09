<template>
  <div class="q-mt-md q-mr-sm">
    <section>
      <div class="row justify-center">
        <q-input
          v-model="chest"
          filled
          dense
          type="number"
          label="Peitoral"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== 0) || 'Dobra cutânea peitoral.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
        <q-input
          v-model="middleAxillary"
          filled
          dense
          type="number"
          label="Axilar Média"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== 0) || 'Dobra cutânea axilar média.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
      </div>
      <div class="row justify-center q-mt-sm">
        <q-input
          v-model="subscapular"
          filled
          dense
          type="number"
          label="Subescapular"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== 0) || 'Dobra cutânea subescapular.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
        <q-input
          v-model="triceps"
          filled
          dense
          type="number"
          label="Tricipital"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== 0) || 'Dobra cutânea tricipital.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
      </div>

      <div class="row justify-center q-mt-sm">
        <q-input
          v-model="thigh"
          filled
          dense
          type="number"
          label="Coxa"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== 0) || 'Dobra cutânea coxa.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
        <q-input
          v-model="abdominal"
          filled
          dense
          type="number"
          label="Abdominal"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== 0) || 'Dobra cutânea abdominal.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
      </div>
      <div class="row justify-start q-mt-sm">
        <q-input
          v-model="suprailiac"
          filled
          dense
          type="number"
          label="Suprailíaca"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== 0) || 'Dobra cutânea suprailíaca.',
          ]"
          class="col-md-6 col-sm-12 q-pr-sm"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnalisysThirdStep",
  data() {
    return {
      chest: null,
      middleAxillary: null,
      subscapular: null,
      triceps: null,
      abdominal: null,
      suprailiac: null,
      thigh: null,
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
        skinFold: {
          chest: this.chest,
          middleAxillary: this.middleAxillary,
          subscapular: this.subscapular,
          triceps: this.triceps,
          abdominal: this.abdominal,
          suprailiac: this.suprailiac,
          thigh: this.thigh,
        },
      };
    },
  },
});
</script>
