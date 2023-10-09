<template>
  <q-card flat>
    <q-item>
      <q-item-section avatar>
        <q-avatar color="secondary" text-color="white">
          {{ initials }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-color-primary text-weight-bold title">
          {{ fullName }}
        </q-item-label>
        <q-item-label caption class="text-weight-light">
          {{ userData.email }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import { useUserStore } from "src/stores/user-store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInfo",
  computed: {
    userData() {
      return useUserStore().getUserData;
    },
    fullName() {
      return ` ${this.userData.firstName} ${this.userData.lastName}`;
    },
    initials() {
      return `${this.userData.firstName[0]}${this.userData.lastName[0]}`;
    },
  },
});
</script>
