<template>
  <div class="q-pt-md q-px-md">
    <q-card flat bordered>
      <q-card-section>
        <div class="title text-weight-bolder text-primary text-h6">
          {{ this.title }}
        </div>
        <div class="text-weight-light text-primary">{{ this.subtitle }}</div>
      </q-card-section>
      <div class="q-px-md q-pb-md relative">
        <slot>
          <!-- Inner component here -->
        </slot>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>
