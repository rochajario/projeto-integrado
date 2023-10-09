<template>
  <q-page class="flex flex-start">
    <recent-news />
  </q-page>
</template>

<script>
import RecentNews from "src/components/RecentNews.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    "recent-news": RecentNews,
  },
});
</script>
