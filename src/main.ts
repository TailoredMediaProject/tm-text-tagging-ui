import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { Configuration, TextDocumentsApi } from "@/openapi";

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
  basePath: "/api/docs",
} as Configuration);
app.provide("textDocAPIClient", textDocsApi);
