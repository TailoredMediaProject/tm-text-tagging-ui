import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { Configuration, TextDocumentsApi } from "@/openapi";
import { BASE_PATH } from "@/openapi/base";

const defaultClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render: () => h(App),
});
app.use(router).mount("#app");

const textDocsApi = new TextDocumentsApi({
  basePath: BASE_PATH,
} as Configuration);
app.provide("textDocAPIClient", textDocsApi);
