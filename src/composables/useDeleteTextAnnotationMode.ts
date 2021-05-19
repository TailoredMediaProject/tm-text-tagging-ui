import { TextDocumentsApi } from "@/openapi";
import { useRouter } from "vue-router";
import { useDeleteAnnotationByTargetIdMutation } from "@/graphql/graphql";

export default function useDeleteTextAnnotationMode(
  textDocsApi: TextDocumentsApi,
  textId: string
): { deleteTextDocument: () => Promise<void> } {
  const router = useRouter();
  const filter = { targetId: textId };

  const {
    mutate: deleteAnnotationsMutation,
  } = useDeleteAnnotationByTargetIdMutation({});
  const deleteTextDocument = async (): Promise<void> => {
    await textDocsApi.deleteTextDocument(textId);
    await deleteAnnotationsMutation({ filter });
    await router.push({ name: "Annotated Resources" });
  };

  return {
    deleteTextDocument,
  };
}
