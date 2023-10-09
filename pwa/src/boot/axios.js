import { boot } from "quasar/wrappers";
import { useUserStore } from "src/stores/user-store";
import axios from "axios";

async function buildRequest(httpMethod, endpoint, payload) {
  const store = useUserStore();

  return axios({
    method: httpMethod,
    url: `${process.env.API}${endpoint}`,
    data: payload,
    headers: {
      Authorization: store.getAccessToken
        ? `Bearer ${store.getAccessToken}`
        : null,
    },
  });
}

class CrossCutting {
  async post(endpoint, payload) {
    return await buildRequest("post", endpoint, payload);
  }
  async get(endpoint) {
    return await buildRequest("get", endpoint);
  }
  async put(endpoint, payload) {
    return await buildRequest("put", endpoint, payload);
  }
  async patch(endpoint, payload) {
    return await buildRequest("patch", endpoint, payload);
  }
  async delete(endpoint) {
    return await buildRequest("delete", endpoint);
  }
}

export const api = new CrossCutting();

export default boot(({ app, router }) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$router = router;
});
