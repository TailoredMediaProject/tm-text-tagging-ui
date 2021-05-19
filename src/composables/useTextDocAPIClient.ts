import { TextDocumentsApi } from "@/openapi";
import { inject } from "vue";

export default function useTextDocAPIClient(): {
  textDocsApi: TextDocumentsApi;
} {
  let textDocsApi: TextDocumentsApi | undefined = inject("textDocAPIClient");
  if (!textDocsApi) {
    textDocsApi = new TextDocumentsApi();
  }
  return {
    textDocsApi,
  };
}
