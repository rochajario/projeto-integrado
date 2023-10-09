<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="title">
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-weight-bolder"> Nutritia </q-toolbar-title>
        <div>
          <q-btn-dropdown
            unelevated
            class="q-ml-lg"
            color="primary"
            label="Opções"
          >
            <q-list>
              <q-item clickable v-close-popup @click="moveToHelp">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-comment-question-outline"
                    color="secondary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="title text-primary">Ajuda</q-item-label>
                  <q-item-label caption>Perguntas Frequentes</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-exit-to-app"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="title text-primary">Sair</q-item-label>
                <q-item-label caption>Encerrar Sessão</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <personal-info-card />
        <q-separator />
        <essential-link
          v-for="route in getPrivateRoutes"
          :key="route.title"
          :icon="route.icon"
          :title="route.name"
          :caption="route.caption"
          :path="route.path"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUserStore } from "src/stores/user-store";
import { privateRoutes } from "src/router/routes.js";
import Router from "src/router";
import EssentialLink from "src/components/NavigationDrawer/EssentialLink.vue";
import PersonalInfoCard from "src/components/NavigationDrawer/PersonalInfoCard.vue";

const store = useUserStore();

export default {
  name: "MainLayout",
  components: {
    "essential-link": EssentialLink,
    "personal-info-card": PersonalInfoCard,
  },
  data() {
    return {
      leftDrawerOpen: true,
    };
  },
  computed: {
    getPrivateRoutes() {
      return privateRoutes.find((x) => (x.name = "MenuList")).children;
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logout() {
      store.clearCredentials();
    },
    moveToHelp() {
      Router.push({ name: "Ajuda" });
    },
  },
};
</script>
