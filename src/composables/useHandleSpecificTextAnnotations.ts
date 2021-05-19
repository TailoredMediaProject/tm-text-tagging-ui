import { Annotation, useAddAnnotationMutation } from "@/graphql/graphql";
import { ref, Ref } from "vue";
import { SpecificText } from "@/composables/useTextSelectionViaPopover";

export default function useHandleSpecificTextAnnotations(
  textId: string,
  refetchAnnotations: () => void
): {
  inputSpecificTextAnnotation: Ref<string>;
  addSpecificTextAnnotation: (
    specificText: SpecificText
  ) => Promise<Annotation>;
} {
  const inputSpecificTextAnnotation = ref("");
  const addAnnotationMutation = useAddAnnotationMutation();

  addAnnotationMutation.onDone(() => {
    inputSpecificTextAnnotation.value = "";
    refetchAnnotations();
  });
  const addSpecificTextAnnotation = (
    specificText: SpecificText
  ): Promise<Annotation> => {
    if (inputSpecificTextAnnotation.value !== "") {
      return addAnnotationMutation
        .mutate({
          bodyText: {
            value: inputSpecificTextAnnotation.value,
          },
          targetTextSelector: {
            source: textId,
            textPositionSelector: {
              start: specificText.start,
              end: specificText.end,
            },
            textQuoteSelector: {
              exact: specificText.text,
            },
          },
        })
        .then((response) => response?.data?.addAnnotation as Annotation);
    }
    return {} as Promise<Annotation>;
  };
  return {
    inputSpecificTextAnnotation,
    addSpecificTextAnnotation,
  };
}
