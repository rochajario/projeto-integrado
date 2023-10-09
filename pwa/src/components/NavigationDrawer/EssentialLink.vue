<template>
  <router-link class="remove-style" :to="path">
    <q-item clickable>
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" color="secondary" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary text-weight-bold title">{{
          title
        }}</q-item-label>
        <q-item-label caption class="text-weight-light">{{
          caption
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    moveTo(route) {
      route.push({ path: route });
    },
  },
});
</script>
<style scoped>
.remove-style {
  text-decoration: none;
  color: inherit;
}
</style>
