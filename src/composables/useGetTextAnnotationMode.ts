import { TextDocResponse, TextDocumentsApi } from "@/openapi";
import useAsyncDataWrapper from "@/composables/useAsyncDataWrapper";
import { Ref } from "vue";

export default function useGetTextAnnotationMode(
  textDocsApi: TextDocumentsApi,
  textId: string
): {
  text: Ref<TextDocResponse | null>;
  isLoadingGetText: Ref<boolean>;
  errorGetText: Ref<string | null>;
  refetchText: () => Promise<void>;
} {
  const getTextDocument = async () => {
    return await textDocsApi.getTextDocument(textId);
  };
  const { isLoading, error, data, refetch } = useAsyncDataWrapper(
    getTextDocument
  );

  return {
    text: data as Ref<TextDocResponse>,
    isLoadingGetText: isLoading,
    errorGetText: error,
    refetchText: refetch,
  };
}
