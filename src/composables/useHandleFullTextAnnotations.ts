import { useAddAnnotationMutation } from "@/graphql/graphql";
import { ref, Ref } from "vue";

export default function useHandleFullTextAnnotations(
  textId: string,
  refetchAnnotations: () => void
): {
  inputFullTextAnnotation: Ref<string>;
  addFullTextAnnotation: () => void;
} {
  const inputFullTextAnnotation = ref("");

  const addAnnotationMutation = useAddAnnotationMutation();
  addAnnotationMutation.onDone(() => {
    inputFullTextAnnotation.value = "";
    refetchAnnotations();
  });
  const addFullTextAnnotation = (): void => {
    if (inputFullTextAnnotation.value !== "") {
      addAnnotationMutation.mutate({
        bodyResource: {
          id: inputFullTextAnnotation.value,
          type: "type",
          label: inputFullTextAnnotation.value,
        },
        targetResource: {
          id: textId,
          type: "http://purl.org/dc/dcmitype/Text",
        },
      });
    }
  };

  return {
    inputFullTextAnnotation,
    addFullTextAnnotation,
  };
}
