const publicRoutes = [
  {
    component: () => import("layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/AuthPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export const privateRoutes = [
  {
    name: "OpenPages",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        caption: "Página Inicial",
        icon: "mdi-home",
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "/meus-pacientes",
        name: "Meus Pacientes",
        caption: "Gerenciamento de Pacientes",
        icon: "mdi-stethoscope",
        component: () => import("pages/MyPatientsPage.vue"),
      },
      {
        path: "/meus-dados",
        name: "Meus Dados",
        caption: "Dados Pessoais",
        icon: "mdi-account-cog",
        component: () => import("pages/MyDataPage.vue"),
      },
    ],
  },
  {
    name: "HiddenPages",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/analise-paciente/:patientId",
        name: "Análises",
        component: () => import("pages/MyAnalisysPage.vue"),
      },
      {
        path: "/ajuda",
        name: "Ajuda",
        component: () => import("pages/HelpPage.vue"),
      },
    ],
  },
];

const routes = [...publicRoutes, ...privateRoutes];
export default routes;
